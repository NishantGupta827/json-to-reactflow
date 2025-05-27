import dagre from '@dagrejs/dagre';
import { Node, Edge, Position } from '@xyflow/react';

// const nodeWidth = 172;
// const nodeHeight = 36;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
): { nodes: Node[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({ rankdir: direction });

  let max_width = 0;
  let max_height = 0;

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.measured?.width, height: node.measured?.height });
    console.log(node.measured?.width)
    if(node.measured?.width! > max_width){
        max_width = node.measured?.width!
    }
    if(node.measured?.height! > max_height){
        max_height = node.measured?.height!
    }
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - max_width / 2,
        y: nodeWithPosition.y - max_height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
