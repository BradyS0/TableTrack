// js/items/TableItem.js
import { Item } from "./Item.js";
import { pointInPolygon } from "../geometry.js";

export class TableItem extends Item {
  constructor(editor, pos) {
    super(editor, "table");

    this.data.capacity = 4;
    this.data.reservable = true;
    this.data.rotation = 0;

    this._buildVisuals();
    this.group.position(pos);
  }

  _buildVisuals() {
    const size = 60;

    this.rect = new Konva.Rect({
      x: -size / 2,
      y: -size / 2,
      width: size,
      height: size,
      cornerRadius: 10,
      fill: "#2e7d5b",
      stroke: "#111",
      strokeWidth: 2
    });

    const label = new Konva.Text({
      text: "T",
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
