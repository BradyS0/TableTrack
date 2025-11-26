import Konva from "../konva.js"
import { SnappingItem } from "./SnappingItem.js";

export class WindowItem extends SnappingItem {
  constructor(editor, pos) {
    super(editor, "window");
    this.data.length = 50;
    this._buildVisuals();
    this.group.position(pos);
    this.snapToNearestWall();
  }

  _buildVisuals() {
    const half = this.data.length / 2;
    const inset = 4;

    this.glassLine = new Konva.Line({
      points: [
        -half + inset, 0,
        half - inset,  0
      ],
      stroke: "#00aaff",
      strokeWidth: 4
    });

    this.group.add(this.glassLine);
  }

  onDragMove(){
    super.onDragMove()
    this.glassLine.stroke(this.hostSegment ? "#00aaff" : "#8b1e2b");
    }
}
