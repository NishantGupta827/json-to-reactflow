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
  type Connection,
  type Node,
  type NodeChange,
  type EdgeChange,
  ControlButton,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  useNodesInitialized,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";
import { ParseBackground } from "./background/BackGround";
import { DnDProvider, useDnD } from "./sidebar/DnD";
import Sidebar from "./sidebar/SideBar";
import { Export, Import } from "./controls/ImportExport";
import { BackgroundConfig, FlowJson } from "@/types/flowJson";
import { getLayoutedElements } from "@/utils/layoutUtil";
import RevisedCustomNode from "./node/GenericRevisedNode";
import { TestJsonType } from "./sidebar/testingSideBarJson";
import { ArrowRightFromLine } from "lucide-react";

export interface BasicFlowProps {
  flowJson: FlowJson;
  sidebarJson: TestJsonType;
}

// const connectionLineStyle = {
//   stroke: "#b1b1b7",
// };

const nodeTypes = {
  custom: RevisedCustomNode,
};

// const edgeTypes = {
//   floating: FloatingEdge,
// };

// const defaultEdgeOptions = {
//   type: "floating",
//   markerEnd: {
//     type: MarkerType.ArrowClosed,
//     color: "#b1b1b7",
//   },
// };

const BasicFlow: React.FC<BasicFlowProps> = ({ flowJson, sidebarJson }) => {
  const { control, minimap, background, edges: normalizedEdges } = flowJson;
  const [, setSelectedNode] = useState<Node | null>(null);
  const { fitView } = useReactFlow();

  const handleNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  // const handleUpdateNode = useCallback((updatedNode: Node) => {
  //   setNodes((nds) =>
  //     nds.map((n) => (n.id === updatedNode.id ? { ...n, ...updatedNode } : n))
  //   );
  //   setSelectedNode(updatedNode);
  // }, []);

  const [nodes, setNodes] = useNodesState(flowJson.nodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const nodesInitialized = useNodesInitialized();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (nodesInitialized && initial) {
      onLayout("LR");
      setInitial(false);
    }
  }, [nodesInitialized, initial]);

  //const sidebarTestJson: SideBarInputJSON = sidebarJson;

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
          data: Node;
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

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleCollapse = () => setIsSidebarCollapsed(false);

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div
        style={{
          width: isSidebarCollapsed ? "0px" : "250px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          borderRight: isSidebarCollapsed ? "none" : "1px solid #ccc",
        }}
      >
        <Sidebar
          json={sidebarJson}
          onCollapseChange={(collapsed) => setIsSidebarCollapsed(collapsed)}
        />
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
          // onNodeDoubleClick={handleNodeDoubleClick}
          onNodeClick={handleNodeClick}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          // edgeTypes={edgeTypes}
          // defaultEdgeOptions={defaultEdgeOptions}
          // connectionLineComponent={CustomConnectionLine}
          // connectionLineStyle={connectionLineStyle}
        >
          {isSidebarCollapsed && (
            <Panel position="top-left">
              <div
                className="xy-theme__button flex"
                style={{
                  width: "175px",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
              >
                <ArrowRightFromLine onClick={() => toggleCollapse()} />
                <span style={{ margin: "auto" }}>Components</span>
              </div>
            </Panel>
          )}
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
          {/* {selectedNode && (
            <NodeDetailsPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onUpdateNode={handleUpdateNode}
            />
          )} */}
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
      <DnDProvider >
        <BasicFlow sidebarJson={sidebarJson} flowJson={flowJson} />
      </DnDProvider>
    </ReactFlowProvider>
  );
};
