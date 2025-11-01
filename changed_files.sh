#!/usr/bin/env bash
# List files changed since last commit or since a base branch.
# Usage:
#   ./scripts/changed_files.sh [--mode MODE] [--base BASE] [--output FILE]
set -eo pipefail

print_usage() {
  cat <<'USAGE'
Usage: changed_files.sh [--mode MODE] [--base BASE] [--output FILE] [--paths-only]

Modes:
  since-last-commit  (default) - files changed in the last commit
  since-branch       - files changed since a base branch (dev/main/master)

Options:
  --base BASE        base branch (default: dev, then main, then master)
  --output FILE      output file (default: changed_files.txt)
  --paths-only       print only file paths
  -h, --help         show this help
USAGE
}

MODE="since-last-commit"
BASE=""
OUTPUT="changed_files.txt"
PATHS_ONLY=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode) MODE="$2"; shift 2;;
    --base) BASE="$2"; shift 2;;
    --output) OUTPUT="$2"; shift 2;;
    --paths-only) PATHS_ONLY=true; shift;;
    -h|--help) print_usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; print_usage; exit 2;;
  esac
done

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 3
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "Not in a git repository" >&2
  exit 4
fi
cd "$REPO_ROOT"

# In CI, attempt to fetch refs if needed
if [[ -n "$GITHUB_ACTIONS" ]]; then
  git fetch --no-tags --prune --depth=50 origin || git fetch --no-tags --prune origin || true
fi

FILES=""
case "$MODE" in
  since-last-commit)
    if git rev-parse --verify HEAD^ >/dev/null 2>&1; then
      FILES="$(git diff --name-only --diff-filter=ACMRT HEAD^..HEAD || true)"
    else
      FILES="$(git show --name-only --pretty=format: HEAD | sed '/^$/d' || true)"
    fi
    ;;
  since-branch)
    if [[ -n "$BASE" ]]; then
      CANDIDATES=("$BASE")
    else
      CANDIDATES=("dev" "main" "master")
    fi
    FOUND_BASE=""
    for b in "${CANDIDATES[@]}"; do
      if git rev-parse --verify "origin/$b" >/dev/null 2>&1; then
        FOUND_BASE="origin/$b"; break
      elif git rev-parse --verify "$b" >/dev/null 2>&1; then
        FOUND_BASE="$b"; break
      fi
    done
    if [[ -z "$FOUND_BASE" ]]; then
      echo "Could not find base branch (tried: ${CANDIDATES[*]}); pass --base explicitly" >&2
      exit 5
    fi
    MERGE_BASE="$(git merge-base HEAD "$FOUND_BASE" 2>/dev/null || true)"
    if [[ -n "$MERGE_BASE" ]]; then
      FILES="$(git diff --name-only --diff-filter=ACMRT "$MERGE_BASE" HEAD || true)"
    else
      FILES="$(git diff --name-only --diff-filter=ACMRT "$FOUND_BASE" HEAD || true)"
    fi
    ;;
  *)
    echo "Unknown mode: $MODE" >&2
    exit 6
    ;;
esac

# Normalize and dedupe while preserving order
if [[ -z "${FILES//[[:space:]]/}" ]]; then
  : > "$OUTPUT"
  if [[ "$PATHS_ONLY" == "true" ]]; then
    exit 0
  else
    echo "No changed files; wrote empty $OUTPUT"
    exit 0
  fi
fi

CLEANED="$(printf "%s\n" "$FILES" | awk 'NF && !seen[$0]++')"
printf "%s\n" "$CLEANED" > "$OUTPUT"

if [[ "$PATHS_ONLY" == "true" ]]; then
  printf "%s\n" "$CLEANED"
else
  echo "Changed files (wrote to $OUTPUT):"
  printf "%s\n" "$CLEANED" | sed 's/^/ - /'
fi

exit 0