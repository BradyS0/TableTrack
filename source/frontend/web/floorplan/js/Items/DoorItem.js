// js/items/DoorItem.js
import { SnappingItem } from "./SnappingItem.js";

export class DoorItem extends SnappingItem {
  constructor(editor, pos) {
    super(editor, "door");
    this.data.length = 80;
    this._buildVisuals();
    this.group.position(pos);
    this.snapToNearestWall();
  }

  _buildVisuals() {
    const length = this.data.length;
    const thickness = 12;
    const half = length / 2;

    this.leftBlock = new Konva.Rect({
      x: -half,
      y: -thickness / 2,
      width: half,
      height: thickness,
      fill: "#444"
    });

    this.rightBlock = new Konva.Rect({
      x: 0,
      y: -thickness / 2,
      width: half,
      height: thickness,
      fill: "#444"
    });

    this.group.add(this.leftBlock);
    this.group.add(this.rightBlock);
  }
}
