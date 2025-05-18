import { type Node, type Edge } from '@xyflow/react';

export interface CanvasConfig {
  background?: string;
  controls?: boolean;
  minimap?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
}

export interface FlowJson {
  nodes: Node[];
  edges: Edge[];
  canvas?: CanvasConfig;
}
