import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { type CanvasConfig, type FlowJson } from '../type';
import { ParseBackground } from './BackGround';

export interface BasicFlowProps {
  json: FlowJson;
}

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { canvas } = json;

  const [nodes, setNodes, onNodesChange] = useNodesState(json.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(json.edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodesDraggable={true}
          fitView
        >
          <Background {...ParseBackground(canvas as CanvasConfig)} />
          {canvas?.controls && <Controls />}
          {canvas?.minimap && <MiniMap />}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default BasicFlow;
