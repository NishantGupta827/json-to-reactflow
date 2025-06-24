import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react"; // Import useMemo
import {
  ReactFlow,
  Controls,
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
  Edge,
  EdgeMouseHandler,
  NodeProps,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DownloadButton from "./controls/DownloadButton";
import { Export, Import } from "./controls/ImportExport";
import { FlowJson } from "@/types/flowJson";
import { getLayoutedElements } from "@/utils/layoutUtil";
import useUndoRedo from "@/hooks/useUndoRedo";
import { FlaskConical } from "lucide-react";
// import CustomEdge from "./edge/GenericEdge";
import { NodeSelectionModal } from "./node/AgentNodeContent";
import AgentNodeWrapper from "./node/GenericRevisedNode";
import { Default } from "./rightSidebar/agent";
import { AgentConfig } from "@/types/agent";
import NodeContent from "./rightSidebar/node";
import { SideBarHeader } from "./rightSidebar/header";

export interface BasicFlowProps {
  flowJson: FlowJson;
  agentJson: AgentConfig;
}

const proOptions = { hideAttribution: true };

const BasicFlow: React.FC<BasicFlowProps> = ({ flowJson, agentJson }) => {
  console.log(flowJson);

  const { fitView } = useReactFlow();
  const { takeSnapshot } = useUndoRedo({
    maxHistorySize: 100,
    enableShortcuts: true,
  });

  const reactflow = useReactFlow();

  const [modalData, setModalData] = useState<{
    nodeId: string;
    handleId: string;
    type: "source" | "target";
    nodeData: any;
  } | null>(null);

  const nodeTypes = useMemo(() => {
    return {
      custom: (nodeProps: NodeProps) => (
        <AgentNodeWrapper {...nodeProps} onHandleClick={setModalData} />
      ),
    };
  }, [setModalData]);

  const [currNode, setCurrNode] = useState<Node | null>(null);
  const [, setCurrEdge] = useState<Edge | null>(null);

  const normalizedNodes: Node[] = flowJson.nodes.map((ele) => ({
    ...ele,
    type: ele.type ?? "custom",
    position: ele.position ?? { x: 0, y: 0 },
    data: {
      ...ele.data,
      isIsland: false, // ensure default isIsland is false
    },
  }));

  const normalizedEdges: Edge[] = flowJson.edges.map((ele) => ({
    ...ele,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 25,
      height: 25,
    },
  }));

  const [nodes, setNodes] = useNodesState(normalizedNodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const nodesInitialized = useNodesInitialized();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (nodesInitialized && initial) {
      onLayout("TB");
      setInitial(false);
    }
  }, [nodesInitialized, initial]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);
        takeSnapshot();
        setTimeout(() => TestForIsland(), 0);
        return updated;
      });
    },
    [takeSnapshot]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const updated = applyEdgeChanges(changes, eds);
        takeSnapshot();
        setTimeout(() => TestForIsland(), 0);
        return updated;
      });
    },
    [setEdges, takeSnapshot]
  );

  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const updated = addEdge(params, eds);
        takeSnapshot();
        setTimeout(() => TestForIsland(), 0);
        return updated;
      });
    },
    [setEdges, takeSnapshot]
  );

  const handleDragStart = useCallback(() => {
    takeSnapshot(); // take snapshot before move
  }, [takeSnapshot]); // Added takeSnapshot to dependencies

  const handleDragStop = useCallback(() => {
    takeSnapshot(); // optionally snapshot again after move
  }, [takeSnapshot]); // Added takeSnapshot to dependencies

  const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDoubleClick: NodeMouseHandler = (
    event: React.MouseEvent,
    node: Node
  ) => {
    event.stopPropagation();
    setCurrNode(node);
    setCurrEdge(null);
    console.log("Double clicked node:", node);
  };

  const onEdgeClick: EdgeMouseHandler = (
    event: React.MouseEvent,
    edge: Edge
  ) => {
    event.stopPropagation();
    setCurrNode(null);
    setCurrEdge(edge);
    console.log("Edge Clicked:", edge);
  };

  const getCurrentFlowJSON = useCallback(() => {
    // Memoize to prevent re-creation
    return {
      //export: flowJson.export,
      //background: background,
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
  }, [nodes, edges]);

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
    [nodes, edges, setNodes, setEdges, fitView] // Added fitView to dependencies
  );

  function TestForIsland() {
    const startingNode = nodes.find((ele) => ele.id === "node_1");
    if (!startingNode) {
      console.error("Starting node not found");
      return;
    }

    const visited = new Set<string>();
    const queue: string[] = [startingNode.id];

    while (queue.length > 0) {
      const id = queue.pop()!;
      if (!visited.has(id)) {
        visited.add(id);
        const conns = reactflow.getNodeConnections({ nodeId: id });
        conns.forEach((ele) => {
          if (!visited.has(ele.target)) {
            queue.push(ele.target);
          }
        });
      }
    }

    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isIsland: !visited.has(node.id),
        },
      }))
    );

    const islandNodes = nodes.filter((ele) => !visited.has(ele.id));
    if (islandNodes.length > 0) {
      console.log(
        "Island node(s) detected:",
        islandNodes.map((n) => n.id)
      );
    }
  }

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div style={{ flex: 1 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStart={handleDragStart}
          onNodeDragStop={handleDragStop}
          onDragOver={onDragOver}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeClick={onEdgeClick}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
        >
          {
            <Controls>
              {<DownloadButton />}
              <ControlButton
                onClick={() => console.log(getCurrentFlowJSON())}
                style={{ zIndex: "1000" }}
              >
                js
              </ControlButton>

              <ControlButton>
                <FlaskConical onClick={() => console.log(TestForIsland())} />
              </ControlButton>
              <Import />
              <Export />
            </Controls>
          }
          {modalData && (
            <NodeSelectionModal
              onClose={() => setModalData(null)}
              onSelect={(newNode) => {
                const newId = `node_${Date.now()}`;
                const position = { x: 300, y: 300 };
                const existing_pos = nodes.find(
                  (ele) => ele.id == modalData.nodeId
                )?.position;

                // console.log(modalData.handleId);
                // console.log(modalData.nodeId);

                switch (modalData.handleId) {
                  case `${modalData.nodeId}-right`:
                    position.x = (existing_pos?.x as number) + 400;
                    position.y = existing_pos?.y as number;
                    break;
                  case `${modalData.nodeId}-left`:
                    position.x = (existing_pos?.x as number) - 400;
                    position.y = existing_pos?.y as number;
                    break;
                  case `${modalData.nodeId}-top`:
                    position.y = (existing_pos?.y as number) - 100;
                    position.x = existing_pos?.x as number;
                    break;
                  case `${modalData.nodeId}-bottom`:
                    position.y = (existing_pos?.y as number) + 200;
                    position.x = existing_pos?.x as number;
                    break;
                  default:
                    break;
                }

                setNodes((nds) => [
                  ...nds,
                  {
                    id: newId,
                    position,
                    data: {
                      ...newNode.data,
                      isIsland: false,
                    },
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
                    type: "smoothstep",
                    markerEnd: {
                      type: MarkerType.ArrowClosed,
                      width: 25,
                      height: 25,
                    },
                  },
                ]);

                setModalData(null);
              }}
            />
          )}
        </ReactFlow>
      </div>
      <div
        style={{
          width: "350px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          borderRight: "1px solid #ccc",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {!currNode ? (
          <>
            <Default data={agentJson} />
          </>
        ) : (
          <div
            style={{ height: "100%", overflowY: "auto" }}
            className="custom-box"
          >
            <SideBarHeader
              icon={
                currNode.data.icon == ""
                  ? "zap"
                  : (currNode.data.icon as string)
              }
              title={currNode.data.title as string}
              onClose={setCurrNode}
            />
            <NodeContent data={currNode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicFlow;

export const flowWrapper: React.FC<BasicFlowProps> = ({
  flowJson,
  agentJson,
}) => {
  return (
    <ReactFlowProvider>
      <BasicFlow flowJson={flowJson} agentJson={agentJson} />
    </ReactFlowProvider>
  );
};
