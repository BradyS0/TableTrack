import Konva from "../konva.js"
export class Item {
  /**
   * @param {LayoutEditor} editor
   * @param {string} type
   */
  constructor(editor, type) {
    this.editor = editor;
    this.type = type;
    this.id =  this._idGen();
    this.data = {};

    this.group = new Konva.Group({
      draggable: true,
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

  changeFill(colorHex){}

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
      {
        label: "Delete",
        action: () => this.editor.confirmDeleteItem(this),
        danger: true,
      },
    ];
  }

  setDraggable(active){
    this.group.draggable(active)
  }

  _idGen() {
    return (
      crypto.randomUUID?.() ||
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      ));
  }

  serialize() {
    return {
      id: this.id,
      type: this.type,
      pos: this.group.position(),
      rotation : this.group.rotation(),
      data: this.data,
    };
  }
}
