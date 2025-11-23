// js/items/SnappingItem.js
import { Item } from "./Item.js";
import { findNearestSegment } from "../geometry.js";

export class SnappingItem extends Item {
  constructor(editor, type) {
    super(editor, type);
    this.hostSegment = null;
  }

  snapToNearestWall() {
    const pos = this.group.position();
    const seg = findNearestSegment(pos, this.editor.state.polygonPoints);
    if (!seg) return false;

    this.hostSegment = seg;
    this.group.position(seg.projPoint);
    this.group.rotation(seg.angleDeg);
    return true;
  }

  onDragMove() {
    const pos = this.editor.stage.getPointerPosition();
    if (!pos) return;
    const seg = findNearestSegment(pos, this.editor.state.polygonPoints);
    if (!seg) {
      this.group.opacity(0.35);
      return;
    }
    this.hostSegment = seg;
    this.group.position(seg.projPoint);
    this.group.rotation(seg.angleDeg);
    this.group.opacity(1);
  }

  onDragEnd() {
    if (!this.hostSegment) {
      this.delete();
    } else {
      this.group.opacity(1);
    }
  }

  getContextMenuItems() {
    return [
      { label: "Delete", action: () => this.editor.confirmDeleteItem(this), danger: true }
    ];
  }
}
