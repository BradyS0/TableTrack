// js/items/DividerItem.js
import { Item } from "./Item.js";

export class DividerItem extends Item {
  constructor(editor, start, end) {
    super(editor, "divider");
    this.data.start = start;
    this.data.end = end;
    this._buildVisuals();
  }

  _buildVisuals() {
    this.line = new Konva.Line({
      points: [
        this.data.start.x, this.data.start.y,
        this.data.end.x, this.data.end.y
      ],
      stroke: "#aaaaaa",
      strokeWidth: 4
    });
    this.group.add(this.line);
  }


}
