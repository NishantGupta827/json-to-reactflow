import { Edge, Node } from "@xyflow/react";

export type HistorySnapshot = {
  nodes: Partial<Node>[];
  edges: Partial<Edge>[];
};

export const sanitizeNode = (node: Node): Partial<Node> => {
  const { style, ...restData } = node.data;

  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: restData,
  };
};

export const sanitizeEdge = (edge: Edge): Partial<Edge> => ({
  id: edge.id,
  type: edge.type,
  label: edge.label,
  source: edge.source,
  sourceHandle: edge.sourceHandle,
  target: edge.target,
  data: edge.data,
  targetHandle: edge.targetHandle,
  markerEnd: edge.markerEnd,
});
