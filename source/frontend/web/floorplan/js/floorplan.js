import { FloorPlanEditor } from "./FloorPlanEditor.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".editor-root");
  if (!root) return;
  new FloorPlanEditor(root);
});