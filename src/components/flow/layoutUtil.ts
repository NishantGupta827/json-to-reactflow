import dagre from "@dagrejs/dagre";
import { Node as FlowNode, Edge, Position } from "@xyflow/react";

// const nodeWidth = 172;
// const nodeHeight = 36;

export function getLayoutedElements(
  nodes: FlowNode[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: FlowNode[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph({
    multigraph: true,
  }).setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === "LR";

  let max_width = 0;
  let max_height = 0;

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.measured?.width,
      height: node.measured?.height,
    });
    if (node.measured?.width! > max_width) {
      max_width = node.measured?.width!;
    }
    if (node.measured?.height! > max_height) {
      max_height = node.measured?.height!;
    }
  });

  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: max_width * 0.5,
  });

  edges.forEach((edge) => {
    const params: dagre.Edge = {
      v: edge.source,
      w: edge.target,
      name: `${edge.sourceHandle}###${edge.targetHandle}`,
    };
    dagreGraph.setEdge(params);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
    };
  });

  return { nodes: layoutedNodes, edges: edges };
}
