import {
  Position,
  MarkerType,
  type Node,
  type Edge,
  type XYPosition,
} from '@xyflow/react';

// Define a custom type to describe nodes with required internal geometry
type InternalNode = Node & {
  internals: {
    positionAbsolute: XYPosition;
  };
  measured: {
    width: number;
    height: number;
  };
  data: {
    shape?: 'rectangle' | 'rounded' | 'circle' | 'diamond';
  };
};

type Point = { x: number; y: number };

function pullBackFromTarget(
  intersection: XYPosition,
  targetCenter: XYPosition,
  sourceCenter: XYPosition,
  targetSize: { width: number; height: number }
): XYPosition {
  const dx = intersection.x - targetCenter.x;
  const dy = intersection.y - targetCenter.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return intersection;

  const targetToLeft = targetCenter.x < sourceCenter.x;
  const baseMaxDist = targetToLeft ? 20 : 100;
  const baseFactor = targetToLeft ? -0.4 : 2.4;
  let backoff = Math.min(len * baseFactor, baseMaxDist);

  const { width: w, height: h } = targetSize;
  const hw = w / 2;
  const hh = h / 2;

  const corners = [
    { x: targetCenter.x, y: targetCenter.y - hh }, // top
    { x: targetCenter.x + hw, y: targetCenter.y }, // right
    { x: targetCenter.x, y: targetCenter.y + hh }, // bottom
    { x: targetCenter.x - hw, y: targetCenter.y }, // left
  ];

  const isNearCorner = corners.some((corner) => {
    const d = Math.hypot(corner.x - intersection.x, corner.y - intersection.y);
    return d < 4.5;
  });

  if (isNearCorner) {
    backoff *= 1.1; // Increase pullback when near corners
  }

  return {
    x: intersection.x - (dx / len) * backoff,
    y: intersection.y - (dy / len) * backoff,
  };
}


function getDiamondIntersection(
  centerA: Point,
  dx: number,
  dy: number,
  w: number,
  h: number
): Point {
  const hw = w / 2;
  const hh = h / 2;

  // Vertices of the diamond, ordered clockwise
  const points = [
    { x: centerA.x, y: centerA.y - hh }, // top
    { x: centerA.x + hw, y: centerA.y }, // right
    { x: centerA.x, y: centerA.y + hh }, // bottom
    { x: centerA.x - hw, y: centerA.y }, // left
  ];

  const segments = [
    [points[0], points[1]],
    [points[1], points[2]],
    [points[2], points[3]],
    [points[3], points[0]],
  ];

  const end = {
    x: centerA.x + dx * 1000,
    y: centerA.y + dy * 1000,
  };

  for (const [p1, p2] of segments) {
    const intersection = getLineIntersection(centerA, end, p1, p2);
    if (intersection) return intersection;
  }

  return centerA; // fallback
}

function getLineIntersection(
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point
): Point | null {
  const a1 = p2.y - p1.y;
  const b1 = p1.x - p2.x;
  const c1 = a1 * p1.x + b1 * p1.y;

  const a2 = p4.y - p3.y;
  const b2 = p3.x - p4.x;
  const c2 = a2 * p3.x + b2 * p3.y;

  const det = a1 * b2 - a2 * b1;
  if (det === 0) return null; // parallel

  const x = (b2 * c1 - b1 * c2) / det;
  const y = (a1 * c2 - a2 * c1) / det;

  const onSegment = (p: Point, q: Point, r: Point) =>
    Math.min(p.x, r.x) - 0.1 <= q.x && q.x <= Math.max(p.x, r.x) + 0.1 &&
    Math.min(p.y, r.y) - 0.1 <= q.y && q.y <= Math.max(p.y, r.y) + 0.1;

  const pt = { x, y };
  if (onSegment(p3, pt, p4)) return pt;

  return null;
}



function getNodeIntersection(sourceNode: InternalNode, targetNode: InternalNode): XYPosition {
  const { width: w, height: h } = sourceNode.measured;
  const shape = sourceNode.data.shape || 'rectangle';

  const centerA = {
    x: sourceNode.internals.positionAbsolute.x + w / 2,
    y: sourceNode.internals.positionAbsolute.y + h / 2,
  };

  const centerB = {
    x: targetNode.internals.positionAbsolute.x + targetNode.measured.width / 2,
    y: targetNode.internals.positionAbsolute.y + targetNode.measured.height / 2,
  };

  const dx = centerB.x - centerA.x;
  const dy = centerB.y - centerA.y;
  const angle = Math.atan2(dy, dx);

  switch (shape) {
    case 'circle': {
      const rx = w / 2;
      const ry = h / 2;
      return {
        x: centerA.x + rx * Math.cos(angle),
        y: centerA.y + ry * Math.sin(angle),
      };
    }

    case 'diamond': {
      return getDiamondIntersection(centerA, dx, dy, w, h);
    }


    default: {
      // Rectangle and rounded fall back to existing method
      const xx1 = dx / w - dy / h;
      const yy1 = dx / w + dy / h;
      const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);
      const xx3 = a * xx1;
      const yy3 = a * yy1;

      return {
        x: w * (xx3 + yy3) / 2 + centerA.x,
        y: h * (-xx3 + yy3) / 2 + centerA.y,
      };
    }
  }
}


function getEdgePosition(node: InternalNode, intersectionPoint: XYPosition): Position {
  const { x, y } = node.internals.positionAbsolute;
  const width = node.measured.width;
  const height = node.measured.height;

  const nx = Math.round(x);
  const ny = Math.round(y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) return Position.Left;
  if (px >= nx + width - 1) return Position.Right;
  if (py <= ny + 1) return Position.Top;
  if (py >= ny + height - 1) return Position.Bottom;

  return Position.Top;
}

export function getEdgeParams(
  source: Node,
  target: Node
): {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  sourcePos: Position;
  targetPos: Position;
} {
  const sourceNode = source as InternalNode;
  const targetNode = target as InternalNode;

  const sourceIntersection = getNodeIntersection(sourceNode, targetNode);
  let targetIntersection = getNodeIntersection(targetNode, sourceNode);

  const sourcePos = getEdgePosition(sourceNode, sourceIntersection);
  const targetPos = getEdgePosition(targetNode, targetIntersection);

  if (targetNode.data.shape === 'diamond') {
    const sourceCenter = {
      x: sourceNode.internals.positionAbsolute.x + sourceNode.measured.width / 2,
      y: sourceNode.internals.positionAbsolute.y + sourceNode.measured.height / 2,
    };

    const targetCenter = {
      x: targetNode.internals.positionAbsolute.x + targetNode.measured.width / 2,
      y: targetNode.internals.positionAbsolute.y + targetNode.measured.height / 2,
    };

    const targetSize = {
      width: targetNode.measured.width,
      height: targetNode.measured.height,
    };

    targetIntersection = pullBackFromTarget(targetIntersection, targetCenter, sourceCenter, targetSize);
  }


  return {
    sx: sourceIntersection.x,
    sy: sourceIntersection.y,
    tx: targetIntersection.x,
    ty: targetIntersection.y,
    sourcePos,
    targetPos,
  };
}



// Creates demo nodes and edges in a circular pattern
export function createNodesAndEdges(): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const center: XYPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  nodes.push({
    id: 'target',
    data: { label: 'Target' },
    position: center,
  });

  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8);
    const radians = (degrees * Math.PI) / 180;
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({
      id: `${i}`,
      data: { label: 'Source' },
      position: { x, y },
    });

    edges.push({
      id: `edge-${i}`,
      source: `${i}`,
      target: 'target',
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
      },
    });
  }

  return { nodes, edges };
}
