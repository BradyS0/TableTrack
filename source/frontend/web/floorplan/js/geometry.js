// js/geometry.js

export function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function pointInPolygon(point, polygon) {
  if (!polygon || polygon.length < 3) return false;
  const x = point.x;
  const y = point.y;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-6) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// simple axis constrain for shift
export function constrainToAxis(last, target) {
  const dx = target.x - last.x;
  const dy = target.y - last.y;
  const res = { ...target };
  if (Math.abs(dx) > Math.abs(dy)) res.y = last.y;
  else res.x = last.x;
  return res;
}

export function formatFeetInches(px, pxPerFoot = 10) {
  const totalFeet = px / pxPerFoot;
  const feet = Math.floor(totalFeet);
  const inches = Math.round((totalFeet - feet) * 12);
  return `${feet}' ${inches}"`;
}

// project a point onto segment AB
export function projectPointToSegment(p, a, b) {
  const ABx = b.x - a.x;
  const ABy = b.y - a.y;
  const len2 = ABx * ABx + ABy * ABy;
  if (len2 < 1e-6) return a;
  const APx = p.x - a.x;
  const APy = p.y - a.y;
  let t = (APx * ABx + APy * ABy) / len2;
  t = Math.max(0, Math.min(1, t));
  return {
    x: a.x + ABx * t,
    y: a.y + ABy * t,
    t
  };
}

export function findNearestSegment(pos, polygon, maxDistance = 30) {
  if (!polygon || polygon.length < 2) return null;
  let best = null;
  let bestDist = Infinity;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const proj = projectPointToSegment(pos, a, b);
    const dx = pos.x - proj.x;
    const dy = pos.y - proj.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < bestDist && dist <= maxDistance) {
      const angleRad = Math.atan2(b.y - a.y, b.x - a.x);
      bestDist = dist;
      best = {
        a,
        b,
        projPoint: { x: proj.x, y: proj.y },
        t: proj.t,
        angleRad,
        angleDeg: (angleRad * 180) / Math.PI
      };
    }
  }
  return best;
}
