import Konva from './konva.js'
import { distance, constrainToAxis, formatFeetInches } from "./geometry.js";

// Detect real segment intersection (excluding shared endpoints)
function segmentsProperlyIntersect(a1, a2, b1, b2) {
  const eps = 1e-6;

  const same = (p, q) => Math.abs(p.x - q.x) < eps && Math.abs(p.y - q.y) < eps;
  if (same(a1, b1) || same(a1, b2) || same(a2, b1) || same(a2, b2)) {
    return false;
  }

  const between = (a, b, c) =>
    Math.max(a, b) + eps >= c && c + eps >= Math.min(a, b);

  if (
    (between(a1.x, a2.x, b1.x) && between(a1.y, a2.y, b1.y)) ||
    (between(a1.x, a2.x, b2.x) && between(a1.y, a2.y, b2.y))
  ) {
    return false;
  }

  const orient = (p, q, r) =>
    (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);

  const o1 = orient(a1, a2, b1);
  const o2 = orient(a1, a2, b2);
  const o3 = orient(b1, b2, a1);
  const o4 = orient(b1, b2, a2);

  return (
    ((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) &&
    ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))
  );
}

export class LayoutCreator {
  constructor(stage, floorLayer, uiLayer, state, onComplete) {
    this.stage = stage;
    this.floorLayer = floorLayer;
    this.uiLayer = uiLayer;
    this.state = state;
    this.onComplete = onComplete;

    // Shadow vector for previewing the next segment
    this.shadowLine = new Konva.Line({
      stroke: "#d29e42",
      strokeWidth: 1.5,
      dash: [8, 8],
      visible: false,
      listening: false,
    });

    // Alignment / snap guide (horizontal/vertical)
    this.snapGuideLine = new Konva.Line({
      stroke: "#4A90E2",
      strokeWidth: 0.8,
      dash: [6, 6],
      visible: false,
      listening: false,
    });

    this.pointGroup = new Konva.Group();
    this.polygonLine = new Konva.Line({
      stroke: "peach",
      strokeWidth: 3,
      closed: false,
      lineCap: "round",
      lineJoin: "round",
    });

    this.measureText = new Konva.Text({
      text: "",
      fontSize: 12 / this.stage.scaleX(),
      fill: "#444",
      visible: false,
      listening: false,
    });

    this.firstPointCircle = null;

    // Order matters → UI elements on top
    this.floorLayer.add(this.polygonLine);

    this.uiLayer.add(this.pointGroup);
    this.uiLayer.add(this.measureText);

    // GUIDE LINES MUST BE ON TOP
    this.uiLayer.add(this.snapGuideLine);
    this.uiLayer.add(this.shadowLine);

    document.addEventListener("contextmenu", (e) => {
      if (e.target.closest('.editor-root')) {
        e.preventDefault();
      }
    });
  }

  reset() {
    this.state.polygonPoints = [];
    this.state.polygonClosed = false;
    this.state.isDrawing = false;

    this.pointGroup.destroyChildren();
    this.shadowLine.visible(false);
    this.snapGuideLine.visible(false);
    this.measureText.visible(false);
    this.firstPointCircle = null;

    this._redrawPolygon();
  }

  _redrawPolygon() {
    const pts = [];
    this.state.polygonPoints.forEach((p) => pts.push(p.x, p.y));
    this.polygonLine.points(pts);
    this.polygonLine.closed(this.state.polygonClosed);
    this.polygonLine.stroke(this.state.polygonClosed ? "#333" : "#444");
    this.polygonLine.strokeWidth(this.state.polygonClosed ? 5 : 3);

    this.floorLayer.draw();
    this.uiLayer.draw();
  }

  _addPoint(pos) {
    this.state.polygonPoints.push({ x: pos.x, y: pos.y });

    const circle = new Konva.Circle({
      x: pos.x,
      y: pos.y,
      radius: 5,
      fill: "#fefefe",
      stroke: "#d29e42",
      strokeWidth: 1.5,
    });

    this.pointGroup.add(circle);

    if (this.state.polygonPoints.length === 1) {
      this.firstPointCircle = circle;
    }

    this._redrawPolygon();
  }

  _setCloseHover(enabled) {
    if (!this.firstPointCircle) return;
    this.firstPointCircle.fill(enabled ? "#4cafef" : "#f5f5f5");
    this.uiLayer.batchDraw();
  }

  // Ensure the new segment doesn't cross previous segments
  _canAddSegment(newPoint) {
    const pts = this.state.polygonPoints;
    const n = pts.length;
    if (n < 2) return true;

    const last = pts[n - 1];

    for (let i = 0; i < n - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      // Skip adjacency
      if (i === n - 2) continue;

      if (segmentsProperlyIntersect(a, b, last, newPoint)) {
        return false;
      }
    }

    return true;
  }

  // Ensure polygon closure doesn't self-intersect
  _canClosePolygon() {
    const pts = this.state.polygonPoints;
    const n = pts.length;
    if (n < 3) return false;

    const first = pts[0];
    const last = pts[n - 1];

    for (let i = 0; i < n - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      // Skip edges that share endpoints with closing segment
      if (i === 0 || i === n - 2) continue;

      if (segmentsProperlyIntersect(a, b, last, first)) {
        return false;
      }
    }

    return true;
  }

  _undoLastPoint() {
    if (this.state.polygonClosed) return;

    const pts = this.state.polygonPoints;
    if (pts.length === 0) return;

    pts.pop();

    const children = this.pointGroup.getChildren();
    if (children.length) children[children.length - 1].destroy();

    if (pts.length === 0) {
      this.state.isDrawing = false;
      this.shadowLine.visible(false);
      this.snapGuideLine.visible(false);
      this.measureText.visible(false);
      this.firstPointCircle = null;
    }

    this._redrawPolygon();
  }

  // Alignment snap logic
  _applyAlignmentSnap(target) {
    const pts = this.state.polygonPoints;
    if (pts.length === 0)
      return { snapped: target, guideFrom: null, axis: null };

    const tol = 8;
    let best = null;
    let minDelta = Infinity;

    for (const p of pts) {
      const dx = Math.abs(target.x - p.x);
      const dy = Math.abs(target.y - p.y);

      if (dx < tol && dx < minDelta) {
        best = { axis: "x", p };
        minDelta = dx;
      }
      if (dy < tol && dy < minDelta) {
        best = { axis: "y", p };
        minDelta = dy;
      }
    }

    if (!best) return { snapped: target, guideFrom: null, axis: null };

    const snapped = { ...target };
    let guideFrom = null;

    if (best.axis === "x") {
      snapped.x = best.p.x;
      guideFrom = { x: best.p.x, y: best.p.y }; // anchor at that point
    } else {
      snapped.y = best.p.y;
      guideFrom = { x: best.p.x, y: best.p.y };
    }

    return { snapped, guideFrom, axis: best.axis };
  }

  // -----------------------------
  // INPUT EVENT HANDLERS
  // -----------------------------

  onMouseDown(evt, pos) {
    if (this.state.polygonClosed) return;

    const button = evt.evt.button;

    // Right-click → undo
    if (button === 2) {
      evt.evt.preventDefault();
      this._undoLastPoint();
      return;
    }

    if (button !== 0) return;

    const pts = this.state.polygonPoints;
    const n = pts.length;
    const shift = evt.evt.shiftKey;

    // Attempt to close shape
    if (n >= 3 && distance(pos, pts[0]) < 10) {
      if (this._canClosePolygon()) {
        this.state.polygonClosed = true;
        this.state.isDrawing = false;
        this.shadowLine.visible(false);
        this.snapGuideLine.visible(false);
        this.measureText.visible(false);
        this._setCloseHover(false);
        this._redrawPolygon();
        if (this.onComplete) this.onComplete();
      }
      return;
    }

    // Normal point creation
    let newPos = pos;
    if (n > 0 && shift) {
      newPos = constrainToAxis(pts[n - 1], pos);
    }

    // Alignment snapping (Illustrator-style)
    const { snapped } = this._applyAlignmentSnap(newPos);
    newPos = snapped;

    if (!this._canAddSegment(newPos)) {
      return;
    }

    this.state.isDrawing = true;
    this._addPoint(newPos);
  }

  onMouseMove(evt, pos) {
    const pts = this.state.polygonPoints;
    const n = pts.length;

    // Close-hover indicator
    if (n >= 3) {
      const nearFirst = distance(pos, pts[0]) < 10;
      this._setCloseHover(nearFirst);
    }

    if (!this.state.isDrawing || n === 0) {
      this.shadowLine.visible(false);
      this.snapGuideLine.visible(false);
      this.measureText.visible(false);
      this.uiLayer.batchDraw();
      return;
    }

    const last = pts[n - 1];
    let target = pos;

    if (evt.evt.shiftKey) {
      target = constrainToAxis(last, pos);
    }

    if (n >= 3 && distance(target, pts[0]) < 10) {
      target = pts[0];
    }

    // Keep a copy of the pre-snapped target for guide length
    const raw = { x: target.x, y: target.y };

    const { snapped, guideFrom, axis } = this._applyAlignmentSnap(target);
    target = snapped;

    // Shadow line: last point -> snapped target
    this.shadowLine.points([last.x, last.y, target.x, target.y]);
    this.shadowLine.visible(true);

    // Snap guide line: from anchor point to raw cursor, so it has length
    if (guideFrom && axis) {
      if (axis === "x") {
        // vertical guide through previous point's x
        this.snapGuideLine.points([
          guideFrom.x,
          guideFrom.y,
          guideFrom.x,
          raw.y,
        ]);
      } else {
        // horizontal guide through previous point's y
        this.snapGuideLine.points([
          guideFrom.x,
          guideFrom.y,
          raw.x,
          guideFrom.y,
        ]);
      }
      this.snapGuideLine.visible(true);
    } else {
      this.snapGuideLine.visible(false);
    }

    const mid = { x: (last.x + target.x) / 2, y: (last.y + target.y) / 2 };
    const len = distance(last, target);
    const angleDeg = Math.round(
      (Math.atan2(target.y - last.y, target.x - last.x) * 180) / Math.PI
    );

    this.measureText.text(`${formatFeetInches(len)} • ${angleDeg}°`);
    this.measureText.position({ x: mid.x + 8, y: mid.y + 8 });
    this.measureText.visible(true);

    this.uiLayer.batchDraw();
  }
}
