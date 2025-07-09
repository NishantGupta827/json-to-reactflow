import { Edge, Node } from "@xyflow/react";

type PartialNodeInput = Partial<Pick<Node, "type" | "position">> &
  Pick<Node, "id"> & { data?: any };

export interface FlowJson {
  nodes: PartialNodeInput[];
  edges: Edge[];
}
