import { FloorPlanEditor } from "./FloorPlanEditor.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".editor-root");
  const save_btn = document.getElementById("save-changes");
  if (!root) return;
  const floorplan = new FloorPlanEditor(root);

  save_btn.addEventListener("click", () => {
    if(floorplan.state.mode=== 'creator'){
      console.log(floorplan.getFloorLayout())
    }else{
      const items = floorplan.getTables()
      console.log(items)
      for (let table of items){
        table.group.on('click', ()=>{
          console.log(table.id)
        } )
      }
    }
  });

});
