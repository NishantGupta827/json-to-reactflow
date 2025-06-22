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
  Edge,
  EdgeMouseHandler,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";
import { ParseBackground } from "./background/BackGround";
import { DnDProvider, useDnD } from "./componentSidebar/DnD";
import Sidebar from "./componentSidebar/SideBar";
import { Export, Import } from "./controls/ImportExport";
import { BackgroundConfig, FlowJson } from "@/types/flowJson";
import { getLayoutedElements } from "@/utils/layoutUtil";
import AgentNode from "./node/GenericRevisedNode";
import useUndoRedo from "@/hooks/useUndoRedo";
import { SideBarJson } from "@/types/sidebar";
import { EdgeSideBarHeader, NodeSideBarHeader } from "./rightSidebar/header";
import { NodeSideBarFooter } from "./rightSidebar/footer";
import { EdgeSideBarContent, NodeSideBarContent } from "./rightSidebar/content";
import { ArrowDown, FlaskConical } from "lucide-react";
import { Button } from "./ui/button";
import CustomEdge from "./edge/GenericEdge";
import { ConvertAgentPayload } from "@/testJson/AgentNode";
import { NodeSelectionModal } from "./node/AgentNodeContent";
import AgentNodeWrapper from "./node/GenericRevisedNode";

export interface BasicFlowProps {
  flowJson: FlowJson;
  sidebarJson: SideBarJson;
}

// const edgeTypes = {
//   custom: CustomEdge,
// };

const proOptions = { hideAttribution: true };

const BasicFlow: React.FC<BasicFlowProps> = ({ flowJson, sidebarJson }) => {
  const { control, background } = flowJson;
  const { fitView } = useReactFlow();
  const { takeSnapshot } = useUndoRedo({
    maxHistorySize: 100,
    enableShortcuts: true,
  });

  const [modalData, setModalData] = useState<{
    nodeId: string;
    handleId: string;
    type: "source" | "target";
    nodeData: any;
  } | null>(null);

  const nodeTypes = {
    custom: (nodeProps: NodeProps) => (
      <AgentNodeWrapper {...nodeProps} onHandleClick={setModalData} />
    ),
  };

  const [sidebarActive, setSidebarActive] = useState(false);
  const [currNode, setCurrNode] = useState<Node | null>(null);
  const [currEdge, setCurrEdge] = useState<Edge | null>(null);

  const normalizedNodes: Node[] = flowJson.nodes.map((ele) => ({
    ...ele,
    type: ele.type ?? "custom",
    position: ele.position ?? { x: 0, y: 0 },
    data: ele.data ?? {},
  }));

  const normalizedEdges: Edge[] = flowJson.edges.map((ele) => ({
    ...ele,
  }));

  const [nodes, setNodes] = useNodesState(normalizedNodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const [count, setCount] = useState(nodes.length + 1);

  const nodesInitialized = useNodesInitialized();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (nodesInitialized && initial) {
      onLayout("TB");
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
          id: `node_${count}`,
          type,
          position,
          data,
        };

        setCount((prev) => {
          return prev + 1;
        });
        console.log(count);

        setNodes((nds) => {
          const updated = nds.concat(newNode);
          takeSnapshot();
          return updated;
        });
      } catch (err) {
        console.error("Failed to parse node data from drag event", err);
      }
    },
    [screenToFlowPosition, setNodes, setCount, count]
  );

  const onNodeDoubleClick: NodeMouseHandler = (
    event: React.MouseEvent,
    node: Node
  ) => {
    event.stopPropagation();
    setSidebarActive(true);
    setCurrNode(node);
    setCurrEdge(null);
    console.log("Double clicked node:", node);
  };

  const onEdgeClick: EdgeMouseHandler = (
    event: React.MouseEvent,
    edge: Edge
  ) => {
    event.stopPropagation();
    setSidebarActive(true);
    setCurrNode(null);
    setCurrEdge(edge);
    console.log("Edge Clicked:", edge);
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

  const closeSideBar = () => {
    setSidebarActive(false);
    setCurrNode(null);
    setCurrEdge(null);
  };

  const saveSideBar = () => {
    console.log(currNode);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === currNode?.id) {
          return {
            ...currNode,
          };
        }
        return node;
      })
    ),
      closeSideBar();
  };

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const test = () => {
    console.log("clicked");
    console.log(text);
    console.log(JSON.parse(text));
    const newNode: Node = {
      id: `node_${count}`,
      type: "custom",
      position: { x: 100, y: 100 },
      data: ConvertAgentPayload(JSON.parse(text)),
    };

    setCount((prev) => {
      return prev + 1;
    });
    console.log(count);

    setNodes((nds) => {
      const updated = nds.concat(newNode);
      return updated;
    });
    setText("");
    setOpen(false);
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
          onEdgeClick={onEdgeClick}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          // edgeTypes={edgeTypes}
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

              <ControlButton>
                <FlaskConical onClick={() => setOpen(true)} />
              </ControlButton>
              <Import />
              <Export />
            </Controls>
          )}
          {open && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-4">Enter node label</h2>
                <textarea
                  rows={15}
                  className="w-full p-2 border rounded mb-4 resize-y"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter node content"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={test}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
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
          {modalData && (
            <NodeSelectionModal
              onClose={() => setModalData(null)}
              onSelect={(newNode) => {
                const newId = `node_${Date.now()}`;
                const position = { x: 300, y: 300 };

                setNodes((nds) => [
                  ...nds,
                  {
                    id: newId,
                    position,
                    data: newNode.data,
                    type: "custom",
                  },
                ]);

                setEdges((eds) => [
                  ...eds,
                  {
                    id: `e${modalData.nodeId}-${newId}`,
                    source:
                      modalData.type === "source" ? modalData.nodeId : newId,
                    target:
                      modalData.type === "target" ? modalData.nodeId : newId,
                    sourceHandle:
                      modalData.type === "source"
                        ? modalData.handleId
                        : undefined,
                    targetHandle:
                      modalData.type === "target"
                        ? modalData.handleId
                        : undefined,
                  },
                ]);

                setModalData(null);
              }}
            />
          )}
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
          {currNode && (
            <div className="flex flex-col h-screen">
              <NodeSideBarHeader
                title={currNode.data.title as string}
                bgColor={currNode.data.color as string}
                closeSideBar={closeSideBar}
              />
              <NodeSideBarContent
                currNode={currNode as Node}
                setCurrNode={setCurrNode}
              />
              <NodeSideBarFooter
                closeSideBar={closeSideBar}
                saveSideBar={saveSideBar}
              />
            </div>
          )}
          {currEdge && (
            <div className="flex flex-col h-screen">
              <EdgeSideBarHeader closeSideBar={closeSideBar} />
              <EdgeSideBarContent
                currEdge={currEdge}
                setCurrEdge={setCurrEdge}
              />
              <NodeSideBarFooter
                closeSideBar={closeSideBar}
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
