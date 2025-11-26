import { LayoutCreator } from "./LayoutCreator.js";
import { LayoutEditor } from "./LayoutEditor.js";
import Konva from './konva.js'

export class FloorPlanEditor {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.container = rootEl.querySelector("#konva-container");
    this.overlayRoot = rootEl.querySelector("#overlay-root");
    this.statusBar = rootEl.querySelector("#status-bar");

    this.state = {
      mode: "creator",
      tool: "select",
      polygonPoints: [],
      polygonClosed: false,
      isDrawing: false,
      worldScale: 1,
      lastPointerPos: null,
      cameraPanning: false,
      items: [],
      selectedItem: null
    };

    this._initStage();
    this._initUI();
  }

  _initStage() {
    this.stage = new Konva.Stage({
      container: this.container,
      width: this.container.clientWidth,
      height: this.container.clientHeight
    });

    this.backgroundLayer = new Konva.Layer();
    this.floorLayer = new Konva.Layer();
    this.itemLayer = new Konva.Layer();
    this.uiLayer = new Konva.Layer();

    this.stage.add(this.backgroundLayer);
    this.stage.add(this.floorLayer);
    this.stage.add(this.itemLayer);
    this.stage.add(this.uiLayer);

    this.creator = new LayoutCreator(
      this.stage,
      this.floorLayer,
      this.uiLayer,
      this.state,
      () => this._onPolygonComplete()
    );

    this.editor = new LayoutEditor(
      this.stage,
      this.backgroundLayer,
      this.itemLayer,
      this.uiLayer,
      this.state,
      this.overlayRoot
    );

    this._attachStageEvents();

    window.addEventListener("resize", () => {
      this.stage.width(this.container.clientWidth);
      this.stage.height(this.container.clientHeight);
      if (this.state.mode === "editor") {
        this.editor.drawGrid();
      }
    });
  }

  _attachStageEvents() {
   
     this.stage.on("mousedown", (evt) => {
    const pointer = this.stage.getPointerPosition();
    const worldPos = this.stage.getRelativePointerPosition();

    // screen-space for panning
    this.state.lastPointerScreenPos = pointer;

    // L+R buttons = pan
    const buttons = evt.evt.buttons || 0;
    if ((buttons & 3) === 3) {
      this.state.cameraPanning = true;
      return;
    }

    if (this.state.mode === "creator") {
      this.creator.onMouseDown(evt, worldPos);
    } else {
      if (evt.evt.button === 0) { // left only for editor tools
        this.editor.onMouseDown(evt, worldPos);
      }
    }
  });

  this.stage.on("mousemove", (evt) => {
    const pointer = this.stage.getPointerPosition();
    const worldPos = this.stage.getRelativePointerPosition();
    if (!pointer || !worldPos) return;

    if (this.state.cameraPanning && this.state.lastPointerScreenPos) {
      const dx = pointer.x - this.state.lastPointerScreenPos.x;
      const dy = pointer.y - this.state.lastPointerScreenPos.y;
      this.stage.x(this.stage.x() + dx);
      this.stage.y(this.stage.y() + dy);
      this.stage.batchDraw();
      this.state.lastPointerScreenPos = pointer;
      return;
    }

    if (this.state.mode === "creator") {
      this.creator.onMouseMove(evt, worldPos);
    } else {
      this.editor.onMouseMove(evt, worldPos);
    }
  });

  this.stage.on("mouseup", (evt) => {
    const worldPos = this.stage.getRelativePointerPosition();
    this.state.cameraPanning = false;
    this.state.lastPointerScreenPos = null;

    if (this.state.mode === "editor") {
      this.editor.onMouseUp(evt, worldPos);
    }
  });

    this.stage.on("wheel", (evt) => {
      evt.evt.preventDefault();
      const oldScale = this.stage.scaleX();
      const pointer = this.stage.getPointerPosition();
      const scaleBy = 1.05;
      const direction = evt.evt.deltaY > 0 ? -1 : 1;
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const minScale = 0.4;
      const maxScale = 4;
      const scale = Math.max(minScale, Math.min(maxScale, newScale));

      const mousePointTo = {
        x: (pointer.x - this.stage.x()) / oldScale,
        y: (pointer.y - this.stage.y()) / oldScale
      };

      this.stage.scale({ x: scale, y: scale });
      const newPos = {
        x: pointer.x - mousePointTo.x * scale,
        y: pointer.y - mousePointTo.y * scale
      };
      this.stage.position(newPos);
      this.stage.batchDraw();

      this.state.worldScale = scale;
      this._updateStatus();
    });

    document.addEventListener("click", (e) => {
      // close context menu when clicking outside
      if (!this.editor.currentContextMenu) return;
      if (e.target.closest(".context-menu")) return;
      this.editor.closeContextMenu();
    });
  }

  _initUI() {
    const tabCreator = this.rootEl.querySelector("#tab-creator");
    const tabEditor = this.rootEl.querySelector("#tab-editor");
    const clearBtn = this.rootEl.querySelector("#btn-clear");
    const toolsSection = this.rootEl.querySelector("#editor-tools");

    tabCreator.addEventListener("click", () => this.setMode("creator"));

    tabEditor.addEventListener("click", () => {
      if (tabEditor.classList.contains("disabled")) return;
      this.setMode("editor");
    });

    clearBtn.addEventListener("click", () => {
       
        this.state.items.forEach(it => it.delete());
        this.state.items = [];

        if(this.state.mode ==='creator'){
          this.creator.reset();
          tabEditor.classList.add("disabled");
        }
    });

    this.rootEl.querySelectorAll(".tool-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.state.mode !== "editor") return;
        const tool = btn.dataset.tool;
        this.state.tool = tool;
        this.rootEl.querySelectorAll(".tool-btn").forEach(b =>
          b.classList.toggle("active", b.dataset.tool === tool)
        );
      });
    });

    this._updateStatus();
  }

  setMode(mode) {
    this.state.mode = mode;
    this._updateStatus();

    const tabCreator = this.rootEl.querySelector("#tab-creator");
    const tabEditor = this.rootEl.querySelector("#tab-editor");
    const toolsSection = this.rootEl.querySelector("#editor-tools");
    const toolTips = document.querySelectorAll('section.controls-list')
    
    tabCreator.classList.toggle("active", mode === "creator");
    tabEditor.classList.toggle("active", mode === "editor");
    
    if (mode === "editor") {
      toolTips[0].style.display = 'none'
      toolTips[1].style.display= toolsSection.style.display = "block";
      this.editor.setMode(true);
    } else {
      toolTips[1].style.display=toolsSection.style.display = "none";
      toolTips[0].style.display = 'block'
      this.editor.setMode(false);
    }
  }

  _onPolygonComplete() {
    const tabEditor = this.rootEl.querySelector("#tab-editor");
    tabEditor.classList.remove("disabled");
    // this.setMode("editor");
  }

  _updateStatus() {
    this.statusBar.textContent =
      `Mode: ${this.state.mode} • Scale: ${this.state.worldScale.toFixed(2)}x`;
  }

  //populate logic
  loadFloorplanPolygon(polygon){
    this.state.polygonPoints = polygon.map(p => ({ x: p.x, y: p.y }));
    this.state.polygonClosed = true;
    this.state.isDrawing = false;
    this.creator._redrawPolygon();
    this._onPolygonComplete()
  }

  loadItems(itemList){
    for(let table of itemList.tables){
      this.editor.addItem(table)
    }

    for(let item of itemList.misc){
      this.editor.addItem(item)
    }
  }

  //return logic
  getFloorLayout(){
    return {floorplan: this.state.polygonPoints}
  }

  getItems(){
    let output = {tables:[], misc:[]}
    for (let item of this.state.items){
      if (item.type === 'table')
        output.tables.push(item.serialize())
      else
        output.misc.push(item.serialize())
    }
    return output
  }
}
