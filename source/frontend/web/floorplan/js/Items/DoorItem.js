import Konva from "../konva.js"
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
    const total = this.data.length;
    const thickness = 8;
    const pad = 14; 
    const blockWidth = (total - pad * 2) / 2;

    // LEFT BLOCK
    this.leftBlock = new Konva.Rect({
      x: -total / 2,
      y: -thickness / 2,
      width: blockWidth,
      height: thickness,
      fill: "#000",
    });

    // CLEAR OPENING AREA (visual)
    this.clearSpace = new Konva.Line({
      points: [
        -total + blockWidth + pad,
        0,
        total  - blockWidth - pad,
        0,
      ],
      stroke: "#f6f1ea",
      strokeWidth: thickness - 3
    });

    // RIGHT BLOCK
    this.rightBlock = new Konva.Rect({
      x: total / 2 - blockWidth,
      y: -thickness / 2,
      width: blockWidth,
      height: thickness,
      fill: "#000",
    });

    this.group.add(this.clearSpace);
    this.group.add(this.leftBlock);
    this.group.add(this.rightBlock);
  }

  onDragMove() {
    super.onDragMove()
    this.clearSpace.stroke(this.hostSegment ? "#f6f1ea" : "#8b1e2b");
  }
}
