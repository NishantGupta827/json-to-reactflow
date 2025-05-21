import React, { useCallback, useMemo } from "react";
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
  MarkerType,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
  reconnectEdge,
  ControlButton,
} from "@xyflow/react";
import GenericCustomNode from "./GenericCustomNode";
import CustomConnectionLine from "./CustomConnectionLine";
import FloatingEdge from "./FloatingEdge";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./DownloadButton";

import { type CanvasConfig, type FlowJson } from "../type";
import { ParseBackground } from "./BackGround";
import createCustomEdgeType from "./Edges";

export interface BasicFlowProps {
  json: FlowJson;
}

const connectionLineStyle = {
  stroke: '#b1b1b7',
};

const initialEdges = [];

const nodeTypes = {
  custom: GenericCustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#b1b1b7',
  },
};

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { canvas, customEdge } = json;

  const [nodes, setNodes] = useNodesState(json.nodes);
  const [edges, setEdges] = useEdgesState(json.edges);


  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // const onReconnect = useCallback(
  //   (oldEdge: Edge, newConnection: Connection) =>
  //     setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
  //   []
  // );

  // const styledEdges = useMemo(() => {
  //   return edges.map(edge => ({
  //     ...edge,
  //     className: 'custom-edge',
  //   }));
  // }, [edges]);


  const getCurrentFlowJSON = () => {
    return {
      export: json.export,
      canvas: canvas,
      customEdge: customEdge,
      nodes: nodes.map(({ id, position, data, type }) => ({
        id,
        position,
        data,
        type,
      })),
      edges: edges.map(({ id, source, target, label }) => ({
        id,
        source,
        target,
        label,
      })),
    };
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineComponent={CustomConnectionLine}
          connectionLineStyle={connectionLineStyle}
        >
          <Background {...ParseBackground(canvas as CanvasConfig)} />
          {canvas?.controls && (
            <Controls>{json.export && <DownloadButton />}<ControlButton onClick={() => console.log(getCurrentFlowJSON())} style={{ zIndex: '1000' }}>
              js
            </ControlButton></Controls>
          )}
          {canvas?.minimap && <MiniMap />}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default BasicFlow;
