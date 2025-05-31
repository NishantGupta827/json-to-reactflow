import dagre from '@dagrejs/dagre';
import { Node as FlowNode, Edge, Position } from '@xyflow/react';

// const nodeWidth = 172;
// const nodeHeight = 36;

export function getLayoutedElements(
  nodes: FlowNode[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
): { nodes: FlowNode[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({ rankdir: direction});

  let max_width = 0;
  let max_height = 0;

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.measured?.width, height: node.measured?.height });
    if(node.measured?.width! > max_width){
        max_width = node.measured?.width!
    }
    if(node.measured?.height! > max_height){
        max_height = node.measured?.height!
    }
  });


  dagreGraph.setGraph({ rankdir:direction,nodesep: !isHorizontal?3*max_height:100, ranksep:!isHorizontal?100:max_width})

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph)

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

  return { nodes: layoutedNodes, edges };
}
