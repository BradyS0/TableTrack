import { FloorPlanEditor } from "./FloorPlanEditor.js";
import { getUserState } from "../../js/utils.js";
// import { api } from "../../js/global.js";
// import { goToHome } from "../../js/components/nav.js";

document.addEventListener("DOMContentLoaded", async() => {
  const root = document.querySelector(".editor-root");
  const save_btn = document.getElementById("save-changes");
  if (!root) return;
  const floorplan = new FloorPlanEditor(root);

  const user = await getUserState()
  // if (!user){goToHome()}

  save_btn.addEventListener("click", () => {
    if (floorplan.state.mode === 'creator') {
      console.log(floorplan.getFloorLayout())
    } else {
      const items = floorplan.getItems()
      console.log(items)
      // Removed event listener attachment to avoid memory leak
    }
  });

});
