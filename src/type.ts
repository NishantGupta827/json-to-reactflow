import { type Node, type Edge } from '@xyflow/react';
import type { CSSProperties } from 'react';

export interface CanvasConfig {
  bgcolor?: string;
  color?:string;
  variant?: 'dots' | 'lines' | 'cross';
  size?:number
  controls?: boolean;
  minimap?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
}

export interface CustomEdgeType{
  typeName?: string
  path?: string
  labelStyle?: CSSProperties
  label?: string;
}

export interface FlowJson {
  export?: boolean;
  nodes: Node[];
  edges: Edge[];
  customEdge: CustomEdgeType[];
  canvas?: CanvasConfig;
}
