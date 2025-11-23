export class Item {
  /**
   * @param {LayoutEditor} editor
   * @param {string} type
   */
  constructor(editor, type) {
    this.editor = editor;
    this.type = type;
    this.id = crypto.randomUUID();
    this.data = {};

    this.group = new Konva.Group({
      draggable: true
    });

    this._attachBaseEvents();
  }

  _attachBaseEvents() {
    // left-click: select
    this.group.on("click", (e) => {
      e.cancelBubble = true;
      this.editor.selectItem(this);
    });

    // right-click: context menu
    this.group.on("contextmenu", (e) => {
      e.evt.preventDefault();
      e.cancelBubble = true;
      this.editor.showContextMenu(this, e.evt.clientX, e.evt.clientY);
    });

    // drag events: delegate to subclass if implemented
    this.group.on("dragmove", () => {
      if (this.onDragMove) this.onDragMove();
    });

    this.group.on("dragend", () => {
      if (this.onDragEnd) this.onDragEnd();
    });
  }

  mount(layer) {
    layer.add(this.group);
    layer.draw();
  }

  unmount() {
    this.group.destroy();
  }

  delete() {
    this.unmount();
    this.editor.unregisterItem(this);
  }

  onSelect() {
    // default outline behavior if rect present
    const rect = this.group.findOne("Rect");
    if (rect) rect.stroke("#4cafef");
  }

  onDeselect() {
    const rect = this.group.findOne("Rect");
    if (rect) rect.stroke("#111");
  }

  getContextMenuItems() {
    return [
      { label: "Delete", action: () => this.editor.confirmDeleteItem(this), danger: true }
    ];
  }

  serialize() {
    const pos = this.group.position();
    return {
      id: this.id,
      type: this.type,
      x: pos.x,
      y: pos.y,
      data: this.data
    };
  }
}
