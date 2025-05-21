import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange,
  ControlButton,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import GenericCustomNode, { type CustomNodeData } from "./GenericCustomNode";
import CustomConnectionLine from "./CustomConnectionLine";
import FloatingEdge from "./FloatingEdge";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";

import { type CanvasConfig, type FlowJson } from "../type";
import { ParseBackground } from "./BackGround";
import { DnDProvider, useDnD } from "./DnD";
import Sidebar, { type SideBarInputJSON } from "./SideBar";
import { Export, Import } from "./controls/ImportExport";

export interface BasicFlowProps {
  json: FlowJson;
}

const connectionLineStyle = {
  stroke: "#b1b1b7",
};

const initialEdges = [];

const nodeTypes = {
  custom: GenericCustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#b1b1b7",
  },
};

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { canvas, customEdge } = json;

  const [nodes, setNodes] = useNodesState(json.nodes);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const sidebarTestJson: SideBarInputJSON = {
    Data: [
      {
        name: "Editable",
        shape: "rounded",
        bgColor: "#fff3e0",
        editable: true,
      },
      {
        name: "Not Editable",
        shape: "rounded",
        bgColor: "#e0f7fa",
        editable: false,
      },
    ],
  };

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

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [_, setType] = useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // const onReconnect = useCallback(
  //   (oldEdge: Edge, newConnection: Connection) =>
  //     setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
  //   []
  // );

  const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();

      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      try {
        const { type, data } = JSON.parse(raw) as {
          type: string;
          data: CustomNodeData;
        };

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: Node = {
          id: `node_${+new Date()}`,
          type,
          position,
          data,
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (err) {
        console.error("Failed to parse node data from drag event", err);
      }
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLElement>) => {
    setType?.("custom");
    event.dataTransfer.setData("text/plain", "custom");
    event.dataTransfer.effectAllowed = "move";
  };

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
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div
        style={{
          width: "250px",
          borderRight: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <Sidebar Data={sidebarTestJson.Data} />
      </div>
      <div style={{ flex: 1 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineComponent={CustomConnectionLine}
          connectionLineStyle={connectionLineStyle}
        >
          <Background {...ParseBackground(canvas as CanvasConfig)} />
          {canvas?.controls && (
            <Controls>
              {json.export && <DownloadButton />}
              <ControlButton
                onClick={() => console.log(getCurrentFlowJSON())}
                style={{ zIndex: "1000" }}
              >
                js
              </ControlButton>
              <Import />
              <Export />
            </Controls>
          )}
          {canvas?.minimap && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
};

export default BasicFlow;

export const flowWrapper: React.FC<BasicFlowProps> = ({ json }) => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <BasicFlow json={json} />
      </DnDProvider>
    </ReactFlowProvider>
  );
};
