export function setUserState(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getUserState(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) || null;
  } catch {
    return null;
  }
}