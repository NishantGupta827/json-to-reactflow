import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Panel,
  useNodesInitialized,
} from "@xyflow/react";
import GenericCustomNode from "./node/GenericCustomNode";
import CustomConnectionLine from "./easyConnect/CustomConnectionLine";
import FloatingEdge from "./easyConnect/FloatingEdge";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";
import NodeDetailsPanel from "./node/GenericNodePanel";
import { ParseBackground } from "./background/BackGround";
import { DnDProvider, useDnD } from "./sidebar/DnD";
import Sidebar, {
  type SideBarInputJSON as SideBarJSON,
} from "./sidebar/SideBar";
import { Export, Import } from "./controls/ImportExport";
import { BackgroundConfig, FlowJson } from "@/types/flowJson";
import { CustomNodeData } from "@/types/nodes";
import { getLayoutedElements } from "@/utils/layoutUtil";

export interface BasicFlowProps {
  flowJson: FlowJson;
  sidebarJson: SideBarJSON;
}

const connectionLineStyle = {
  stroke: "#b1b1b7",
};

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

const BasicFlow: React.FC<BasicFlowProps> = ({ flowJson, sidebarJson }) => {
  const { control, minimap, background, edges: rawEdges } = flowJson;
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { fitView } = useReactFlow();

  const handleNodeDoubleClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleUpdateNode = useCallback((updatedNode: Node) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? { ...n, ...updatedNode } : n))
    );
    setSelectedNode(updatedNode);
  }, []);

  const normalizedEdges = rawEdges.map((edge) => ({
    ...edge,
    type: "floating",
  })) as Edge[];

  const [nodes, setNodes] = useNodesState(flowJson.nodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const nodesInitialized = useNodesInitialized();
  console.log(nodesInitialized);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (nodesInitialized && initial) {
      onLayout("TB");
      setInitial(false);
    }
  }, [nodesInitialized, initial]);

  const sidebarTestJson: SideBarJSON = sidebarJson;

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [_] = useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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
          x: event.clientX - 50,
          y: event.clientY - 50,
        });

        const newNode: Node = {
          id: `node_${+new Date()}`,
          type,
          position,
          dragHandle: ".drag-handle",
          data,
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (err) {
        console.error("Failed to parse node data from drag event", err);
      }
    },
    [screenToFlowPosition, setNodes]
  );

  const getCurrentFlowJSON = () => {
    return {
      export: flowJson.export,
      background: background,
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

  const onLayout = useCallback(
    (direction: "TB" | "LR" = "TB") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 500 });
      }, 0);
    },
    [nodes, edges, setNodes, setEdges]
  );

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
          //onDragStart={onDragStart}
          onNodeDoubleClick={handleNodeDoubleClick}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineComponent={CustomConnectionLine}
          connectionLineStyle={connectionLineStyle}
        >
          <Background {...ParseBackground(background as BackgroundConfig)} />
          {control && (
            <Controls>
              {flowJson.export && <DownloadButton />}
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
          {minimap && <MiniMap />}
          {selectedNode && (
            <NodeDetailsPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onUpdateNode={handleUpdateNode}
            />
          )}
          <Panel position="top-right">
            <button className="xy-theme__button" onClick={() => onLayout("TB")}>
              vertical layout
            </button>
            <button className="xy-theme__button" onClick={() => onLayout("LR")}>
              horizontal layout
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default BasicFlow;

export const flowWrapper: React.FC<BasicFlowProps> = ({
  sidebarJson,
  flowJson,
}) => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <BasicFlow sidebarJson={sidebarJson} flowJson={flowJson} />
      </DnDProvider>
    </ReactFlowProvider>
  );
};
