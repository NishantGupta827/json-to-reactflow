import { Edge,Node } from "@xyflow/react";

export interface BackgroundConfig {
  bgcolor?: string;
  color?:string;
  variant?: 'dots' | 'lines' | 'cross';
  size?:number
  gap?:number
  lineWidth?:number
  gridSize?: number;
}

export interface FlowJson {
  export?: boolean;
  control?: boolean;
  minimap?: boolean;
  nodes: Node[];
  edges: Edge[];
  background?: BackgroundConfig;
}
