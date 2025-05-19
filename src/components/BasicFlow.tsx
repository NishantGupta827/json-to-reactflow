import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
  reconnectEdge,
} from '@xyflow/react';
import GenericCustomNode from './GenericCustomNode';
import '@xyflow/react/dist/style.css';
import DownloadButton from './DownloadButton';

import { type CanvasConfig, type FlowJson } from '../type';
import { ParseBackground } from './BackGround';
import createCustomEdgeType from './Edges';

export interface BasicFlowProps {
  json: FlowJson;
}

const nodeTypes = {
  custom: GenericCustomNode
};

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { canvas,customEdge } = json;

  const [nodes, setNodes] = useNodesState(json.nodes);
  const [edges, setEdges] = useEdgesState(json.edges);

  const edgeMaps = useMemo(() => {
    return Object.fromEntries(
      customEdge.map(edge => [edge.typeName, createCustomEdgeType(edge)])
    );
  }, [customEdge]);


  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
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
          nodeTypes={nodeTypes}
          edgeTypes={edgeMaps}
          onReconnect={onReconnect}
          fitView
        >
          <Background {...ParseBackground(canvas as CanvasConfig)} />
          {json.export && <DownloadButton />}
          {canvas?.controls && <Controls />}
          {canvas?.minimap && <MiniMap />}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default BasicFlow;
