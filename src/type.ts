import { type Node, type Edge, BackgroundVariant, type BackgroundProps } from '@xyflow/react';
import type { CSSProperties } from 'react';

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

export interface CustomEdgeType{
  type?: string
  path?: string
  label?: string
  labelStyle?: CSSProperties
}

export interface FlowJson {
  nodes: Node[];
  edges: Edge[];
  customEdge: CustomEdgeType[];
  canvas?: CanvasConfig;
}
