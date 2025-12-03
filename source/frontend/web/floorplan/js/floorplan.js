import { FloorPlanEditor } from "./FloorPlanEditor.js";
import { getUserState } from "../../js/utils.js";
import { api } from "../../js/global.js";
import { goToHome } from "../../js/components/nav.js";

document.addEventListener("DOMContentLoaded", async() => {
  const root = document.querySelector(".editor-root");
  if (!root) return;
  const floorplan = new FloorPlanEditor(root);

  const user = await getUserState()
  if (!user){goToHome()}

  if(user.restID) await buildFloorplan(user.restID, floorplan);  
});


async function buildFloorplan(restID, floorplan){
  const save_btn = document.getElementById("save-changes");
  save_btn.addEventListener("click", async () => {
    if (floorplan.state.mode === 'creator') {
      const fp = floorplan.getFloorLayout()
      await api.set_walls(restID,fp)
    } else {
      const items = floorplan.getItems()
      await api.set_layout(restID,items)
    }
  });

  let fp = await api.get_walls(restID)
  let layout = await api.get_layout(restID)
  console.log(fp)
  console.log(layout)
  if (fp.code < 300){
    floorplan.loadFloorplanPolygon(fp.data.floorplan)
  }
  
  if (layout.code < 300){
    floorplan.loadItems(layout.data)
  }

}
