import { type Node, type Edge, BackgroundVariant, type BackgroundProps } from '@xyflow/react';

export interface CanvasConfig {
  bgcolor?: string;
  color?:string;
  variant?:BackgroundVariant
  size?:number
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
