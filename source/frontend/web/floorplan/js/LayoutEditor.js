import Konva from './konva.js'
import { pointInPolygon } from "./geometry.js";
import { TableItem } from "./Items/TableItem.js";
import { DoorItem } from "./Items/DoorItem.js";
import { WindowItem } from "./Items/WindowItem.js";

export class LayoutEditor {
  constructor(stage, backgroundLayer, itemLayer, uiLayer, state, overlayRoot) {
    this.stage = stage;
    this.backgroundLayer = backgroundLayer;
    this.itemLayer = itemLayer;
    this.uiLayer = uiLayer;
    this.state = state;
    this.overlayRoot = overlayRoot;

    this.currentContextMenu = null;
    this.currentModal = null;

    this.drawGrid();
  }

  setMode(active) {
    if (active) {
      this.drawGrid();   // only draws grid inside polygon
    } else {
      this.backgroundLayer.destroyChildren();
      this.backgroundLayer.draw();
      this.closeContextMenu();
    }
  }


  setTool(tool) {
    this.state.tool = tool;
  }

  registerItem(item) {
    this.state.items.push(item);
    item.mount(this.itemLayer);
    document.getElementById("save-changes").disabled = false
  }

  unregisterItem(item) {
    this.state.items = this.state.items.filter(i => i !== item);
    if (this.state.selectedItem === item) {
      this.selectItem(null);
    }
    this.itemLayer.draw();
    document.getElementById("save-changes").disabled = false
  }

  selectItem(item) {
    if (this.state.selectedItem && this.state.selectedItem !== item) {
      this.state.selectedItem.onDeselect();
    }
    this.state.selectedItem = item;
    if (item) item.onSelect();
    this.itemLayer.draw();
    this.uiLayer.draw();
  }

  addItem(newItem){
    const {pos,type,rotation} = newItem
    let item = null
    if(type ==='table' && this.isInsideFloor(pos)){
      item = new TableItem(this, pos, newItem.data)
      item.changeFill(newItem.data.reservable ? 'green' : 'slategrey')
      item.changeLabel(newItem.tableID)
    }else if (type==='door'){
      item = new DoorItem(this,pos) 
      item = item.snapToNearestWall(pos) ? item : null
    }else if (type ==='window'){
      item = new WindowItem(this,pos) 
      item = item.snapToNearestWall(pos) ? item : null
    }

    if (item){
      this.registerItem(item)
      item.group.rotation(rotation)
    }
    return item
  }

drawGrid() {
  this.backgroundLayer.destroyChildren();

  // --- 1. Compute polygon bounds ---
  const poly = this.state.polygonPoints;
  if (!poly || poly.length < 3) return;

  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  for (const p of poly) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }

  // --- 2. Create a clipped group ---
  const clipped = new Konva.Group({
    clipFunc: ctx => {
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.closePath();
    }
  });

  const spacing = 50;

  // --- 3. Draw vertical grid lines INSIDE polygon bounding box ---
  for (let x = minX - (minX % spacing); x <= maxX; x += spacing) {
    clipped.add(
      new Konva.Line({
        points: [x, minY, x, maxY],
        stroke: "#d3d3d3",
        strokeWidth: 1
      })
    );
  }

  // --- 4. Draw horizontal grid lines INSIDE polygon bounding box ---
  for (let y = minY - (minY % spacing); y <= maxY; y += spacing) {
    clipped.add(
      new Konva.Line({
        points: [minX, y, maxX, y],
        stroke: "#d3d3d3",
        strokeWidth: 1
      })
    );
  }

  this.backgroundLayer.add(clipped);
  this.backgroundLayer.draw();
}


  isInsideFloor(pos) {
    return pointInPolygon(pos, this.state.polygonPoints);
  }

  onMouseDown(evt, pos) {
    this.closeContextMenu();

    if (evt.evt.button !== 0) return; // left only for tools

    if (this.state.tool === "table") {
      if (!this.isInsideFloor(pos)) return;
      const t = new TableItem(this, pos);
      this.registerItem(t);
      this.selectItem(t);
    } else if (this.state.tool === "door") {
      const d = new DoorItem(this, pos);
      if (d.snapToNearestWall()) {
        this.registerItem(d);
        this.selectItem(d);
      } else {
        d.delete();
      }
    } else if (this.state.tool === "window") {
      const w = new WindowItem(this, pos);
      if (w.snapToNearestWall()) {
        this.registerItem(w);
        this.selectItem(w);
      } else {
        w.delete();
      }
    } 

    const shift= evt.evt.shiftKey
    if(!shift){
    this.state.tool= 'select'
    document.querySelectorAll(".tool-btn").forEach(btn =>
          btn.classList.toggle("active", btn.dataset.tool ==='select')
        );
      }
  }
/* eslint-disable-line no-unused-vars */
  onMouseMove(_evt, _pos) {
    // intentionally unused
  }
/* eslint-disable-line no-unused-vars */
  onMouseUp(_evt, _pos) {
    // intentionally unused
  }


  /* ---------- Context Menu ---------- */

  closeContextMenu() {
    if (!this.currentContextMenu) return;
    this.currentContextMenu.remove();
    this.currentContextMenu = null;
  }

  showContextMenu(item, clientX, clientY) {
    this.closeContextMenu();
    if (this.state.mode === 'read-only') return;

    const menu = document.createElement("div");
    menu.className = "context-menu";
    menu.style.left = `${clientX}px`;
    menu.style.top = `${clientY}px`;

    const entries = item.getContextMenuItems();
    for (const entry of entries) {
      const div = document.createElement("div");
      div.className = "context-item" + (entry.danger ? " danger" : "");
      div.textContent = entry.label;
      div.addEventListener("click", () => {
        entry.action();
        this.closeContextMenu();
      });
      menu.appendChild(div);
    }

    document.body.appendChild(menu);
    this.currentContextMenu = menu;
  }

  /* ---------- Modal helpers ---------- */

  confirmDeleteItem(item) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";

    const modal = document.createElement("div");
    modal.className = "modal";

    const title = document.createElement("h3");
    title.textContent = "Delete item?";
    modal.appendChild(title);

    const p = document.createElement("p");
    p.textContent = "This action cannot be undone.";
    modal.appendChild(p);

    const footer = document.createElement("div");
    footer.className = "modal-footer";

    const cancel = document.createElement("button");
    cancel.className = "btn2 small";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => {
      backdrop.remove();
    });

    const del = document.createElement("button");
    del.className = "btn2 small danger";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      item.delete();
      backdrop.remove();
    });

    footer.appendChild(cancel);
    footer.appendChild(del);
    modal.appendChild(footer);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  }

  openTableSettings(tableItem) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";

    const modal = document.createElement("div");
    modal.className = "modal";

    const title = document.createElement("h3");
    title.textContent = "Table settings";
    modal.appendChild(title);

    const capLabel = document.createElement("label");
    capLabel.textContent = "Max capacity";
    capLabel.className = 'modal-row';

    const capInput = document.createElement("input");
    capInput.type = "number";
    capInput.min = "1";
    capInput.max = "20";
    capInput.value = tableItem.data.capacity ?? 4;

    capLabel.appendChild(capInput);
    modal.appendChild(capLabel);

    const checkLabel = document.createElement("label");
    checkLabel.className = "checkbox-row";
    checkLabel.textContent = "Reservable";
    checkLabel.for = "table-reserve";
    
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = "table-reserve";
    chk.checked = tableItem.data.reservable ?? true;

    checkLabel.append(chk);
    modal.appendChild(checkLabel);

    const footer = document.createElement("div");
    footer.className = "modal-footer";

    const cancel = document.createElement("button");
    cancel.className = "btn2 small";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => {
      backdrop.remove();
    });

    const save = document.createElement("button");
    save.className = "btn2 small primary";
    save.textContent = "Save";
    save.addEventListener("click", () => {
      tableItem.data.capacity = parseInt(capInput.value, 10) || 4;
      tableItem.data.reservable = chk.checked;
      backdrop.remove();
      document.getElementById("save-changes").disabled = false
    });

    footer.appendChild(cancel);
    footer.appendChild(save);
    modal.appendChild(footer);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  }
}
