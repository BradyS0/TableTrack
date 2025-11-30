// js/items/TableItem.js
import { Item } from "./Item.js";
import { pointInPolygon } from "../geometry.js";
import Konva from "../konva.js"

export class TableItem extends Item {
    static i = 0;

    constructor(editor, pos, data={capacity:4, reservable:true, rotation:0}) {
        super(editor, "table");
        TableItem.i++;
        
        this.data = {...this.data, ...data}
        this._buildVisuals();
        this.group.position(pos);
    }
    

  _buildVisuals() {
    const size = 35;

    this.rect = new Konva.Rect({
      x: -size / 2,
      y: -size / 2,
      width: size,
      height: size,
      cornerRadius: 2,
      fill: "#2e7d5b",
      stroke: "#111",
      strokeWidth: 2
    });

    const label = new Konva.Text({
      text: `T${TableItem.i}`,
      fontSize: 16,
      fill: "#f5f5f5",
      align: "center",
      verticalAlign: "middle",
      width: size,
      height: size,
      offsetX: size / 2,
      offsetY: size / 2
    });

    this.group.add(this.rect);
    this.group.add(label);
  }

  onDragMove() {
    const pos = this.group.position();
    const inside = pointInPolygon(pos, this.editor.state.polygonPoints);
    this.rect.fill(inside ? "#2e7d5b" : "#8b1e2b");
  }

  onDragEnd() {
    const pos = this.group.position();
    const inside = pointInPolygon(pos, this.editor.state.polygonPoints);
    if (!inside) {
      this.delete();
    } else {
      this.rect.fill("#2e7d5b");
    }
  }

  changeFill(colorHex){
    this.rect.fill(colorHex)
  }

  rotate(deltaDeg) {
    this.data.rotation = (this.data.rotation + deltaDeg) % 360;
    this.group.rotation(this.data.rotation);
  }

  getContextMenuItems() {
    return [
      { label: "Rotate 30°", action: () => this.rotate(30) },
      { label: "Settings…", action: () => this.editor.openTableSettings(this) },
      { label: "Delete", action: () => this.editor.confirmDeleteItem(this), danger: true }
    ];
  }
}
