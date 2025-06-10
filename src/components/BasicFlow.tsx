import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  // MiniMap,
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
  useNodesInitialized,
  NodeMouseHandler,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";
import { ParseBackground } from "./background/BackGround";
import { DnDProvider, useDnD } from "./componentSidebar/DnD";
import Sidebar from "./componentSidebar/SideBar";
import { Export, Import } from "./controls/ImportExport";
import { BackgroundConfig, FlowJson } from "@/types/flowJson";
import { getLayoutedElements } from "@/utils/layoutUtil";
import RevisedCustomNode from "./node/GenericRevisedNode";
import useUndoRedo from "@/hooks/useUndoRedo";
import { SideBarJson } from "@/types/sidebar";
import { NodeSideBarHeader } from "./nodeSidebar/header";
import { NodeSideBarFooter } from "./nodeSidebar/footer";
import { SideBarContent } from "./nodeSidebar/content";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export interface BasicFlowProps {
  flowJson: FlowJson;
  sidebarJson: SideBarJson;
}

const nodeTypes = {
  custom: RevisedCustomNode,
};

const proOptions = { hideAttribution: true };

const BasicFlow: React.FC<BasicFlowProps> = ({ flowJson, sidebarJson }) => {
  const { control, minimap, background, edges: normalizedEdges } = flowJson;
  const { fitView } = useReactFlow();
  const { takeSnapshot } = useUndoRedo({
    maxHistorySize: 100,
    enableShortcuts: true,
  });
  const [sidebarActive, setSidebarActive] = useState(false);
  const [curr, setCurr] = useState<Node | null>(null);

  const normalizedNodes: Node[] = flowJson.nodes.map((ele) => ({
    ...ele,
    type: ele.type ?? "custom",
    position: ele.position ?? { x: 0, y: 0 },
    data: ele.data ?? {},
  }));

  const [nodes, setNodes] = useNodesState(normalizedNodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const nodesInitialized = useNodesInitialized();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (nodesInitialized && initial) {
      onLayout("LR");
      setInitial(false);
    }
  }, [nodesInitialized, initial]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      const updated = applyNodeChanges(changes, nds);
      takeSnapshot();
      return updated;
    });
  }, []);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const updated = applyEdgeChanges(changes, eds);
        takeSnapshot();
        return updated;
      });
    },
    [setEdges, takeSnapshot]
  );

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [_] = useDnD();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const updated = addEdge(params, eds);
        takeSnapshot();
        return updated;
      });
    },
    [setEdges, takeSnapshot]
  );

  const handleDragStart = useCallback(() => {
    takeSnapshot(); // take snapshot before move
  }, []);

  const handleDragStop = useCallback(() => {
    takeSnapshot(); // optionally snapshot again after move
  }, []);

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
          data,
        };

        setNodes((nds) => {
          const updated = nds.concat(newNode);
          takeSnapshot();
          return updated;
        });
      } catch (err) {
        console.error("Failed to parse node data from drag event", err);
      }
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeDoubleClick: NodeMouseHandler = (
    event: React.MouseEvent,
    node: Node
  ) => {
    event.stopPropagation();
    setSidebarActive(true);
    setCurr(node);
    console.log("Double clicked node:", node);
  };

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

  const closeNodeSideBar = () => {
    setSidebarActive(false);
    setCurr(null);
  };

  const saveSideBar = () => {
    console.log(curr);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === curr?.id) {
          return {
            ...curr,
          };
        }
        return node;
      })
    ),
      closeNodeSideBar();
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div
        style={{
          width: "250px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          borderRight: "1px solid #ccc",
        }}
      >
        <Sidebar json={sidebarJson} />
      </div>
      <div style={{ flex: 1 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onNodeDragStart={handleDragStart}
          onNodeDragStop={handleDragStop}
          onDragOver={onDragOver}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
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

          <Panel position="bottom-right" className="flex gap-x-2">
            <Button variant="outline">Playground</Button>
            <Button variant="default" className="bg-purple-600">
              Publish{" "}
              <span className="ml-1">
                <ArrowDown height={16} width={16} />
              </span>
            </Button>
          </Panel>
          {/* {minimap && <MiniMap />} */}
        </ReactFlow>
      </div>
      {sidebarActive && (
        <div
          style={{
            width: "350px",
            transition: "width 0.3s ease",
            overflow: "hidden",
            borderRight: "1px solid #ccc",
          }}
        >
          {curr && (
            <div className="flex flex-col h-screen">
              <NodeSideBarHeader
                title={curr.data.title as string}
                bgColor={curr.data.color as string}
                closeSideBar={closeNodeSideBar}
              />
              <SideBarContent curr={curr} setCurr={setCurr} />
              <NodeSideBarFooter
                closeSideBar={closeNodeSideBar}
                saveSideBar={saveSideBar}
              />
            </div>
          )}
        </div>
      )}
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
