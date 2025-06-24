import { Edge, Node } from "@xyflow/react";

export interface BackgroundConfig {
  bgcolor?: string;
  color?: string;
  variant?: "dots" | "lines" | "cross";
  size?: number;
  gap?: number;
  lineWidth?: number;
  gridSize?: number;
}

type PartialNodeInput = Partial<Pick<Node, "type" | "position">> &
  Pick<Node, "id"> & { data?: any };

export interface FlowJson {
  nodes: PartialNodeInput[];
  edges: Edge[];
}
