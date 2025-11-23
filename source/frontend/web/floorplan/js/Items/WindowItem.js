// js/items/WindowItem.js
import { SnappingItem } from "./SnappingItem.js";

export class WindowItem extends SnappingItem {
  constructor(editor, pos) {
    super(editor, "window");
    this.data.length = 80;
    this._buildVisuals();
    this.group.position(pos);
    this.snapToNearestWall();
  }

  _buildVisuals() {
    const length = this.data.length;
    const thickness = 10;
    const half = length / 2;
    const inset = 4;

    this.leftBlock = new Konva.Rect({
      x: -half,
      y: -thickness / 2,
      width: half,
      height: thickness,
      fill: "#333"
    });

    this.rightBlock = new Konva.Rect({
      x: 0,
      y: -thickness / 2,
      width: half,
      height: thickness,
      fill: "#333"
    });

    this.glassLine = new Konva.Line({
      points: [
        -half + inset, 0,
        half - inset,  0
      ],
      stroke: "#00aaff",
      strokeWidth: 2
    });

    this.group.add(this.leftBlock);
    this.group.add(this.rightBlock);
    this.group.add(this.glassLine);
  }
}
