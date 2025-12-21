import { FloorPlanEditor } from "./FloorPlanEditor.js";
import { getUserState } from "../../js/utils.js";
import { api } from "../../js/global.js";
import { goToHome } from "../../js/components/nav.js";
import { generateTemplate } from "../../js/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.querySelector(".editor-root");
  if (!root) return;
  const floorplan = new FloorPlanEditor(root);

  const user = await getUserState();
  if (!user) {
    goToHome();
  }

  if (user.restID) await buildFloorplan(user.restID, floorplan);
});

async function buildFloorplan(restID, floorplan) {
  const save_btn = document.getElementById("save-changes");
  save_btn.addEventListener("click", async () => {
    const fp = floorplan.getFloorLayout();
    if (floorplan.state.mode === "creator") {
      const req = await api.set_walls(restID, fp);
      displaySavedMsg(req.message, req.code<300)
    } else {
      const items = floorplan.getItems();
      const req1 = await api.set_walls(restID, fp);
      const req2 = await api.set_layout(restID, items);
      displaySavedMsg(req1.message, req1.code<300 && req2.code<300)
    }
    save_btn.disabled = true
  });

  let fp = await api.get_walls(restID);
  let layout = await api.get_layout(restID);

  if (fp.code < 300) floorplan.loadFloorplanPolygon(fp.data.floorplan);

  if (layout.code < 300) floorplan.loadItems(layout.data);
  setUnload(floorplan)
}

function displaySavedMsg(msg, success) {
  const old_msg = document.getElementById("save-msg")
  const message = generateTemplate(`<p id="save-msg" 
    class="${success ? "primary" : "danger"}">
    ${msg}</p>`);

  if(old_msg)
    old_msg.replaceWith(message)
  else
    document.body.append(message)

  setTimeout(() => {
    message.remove();
  }, 2000);
}


function setUnload(floorplan){
  window.addEventListener('beforeunload', function (event) {
            if (floorplan.state.changeCount>2) {
                // Standard way to trigger the confirmation dialog in modern browsers
                event.preventDefault();
                event.returnValue = ''; 
            }
            // If formChanged is false, no dialog will appear, and navigation proceeds normally.
  });
}
