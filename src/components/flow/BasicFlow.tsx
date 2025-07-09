import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type NodeChange,
  type EdgeChange,
  ReactFlowProvider,
  useReactFlow,
  useNodesInitialized,
  NodeMouseHandler,
  Edge,
  EdgeMouseHandler,
  NodeProps,
  MarkerType,
  type EdgeTypes,
  Panel,
  Background,
} from "@xyflow/react";
import equal from "fast-deep-equal";
import "@xyflow/react/dist/style.css";
import { getLayoutedElements } from "@/components/flow/layoutUtil";
import { NodeSelectionModal } from "../node/AgentNodeContent";
import AgentNodeWrapper from "../node/GenericRevisedNode";
import { Default } from "../rightSidebar/agent";
import { EdgeSidebar } from "../rightSidebar/edge";
import { AgentConfig } from "@/types/agent";
import NodeContent from "../rightSidebar/node";
import { SideBarHeader } from "../rightSidebar/header";
import { FlowJson } from "@/types/flowJson";
import CustomEdge from "../edge/CustomEdge";
import { CustomControls } from "../controls/CustomControl";
import { X } from "lucide-react";
import { convertBackendRes } from "./FlowFunctions";
import { sanitizeNode, sanitizeEdge, HistorySnapshot } from "./UndoRedo";

export interface BasicFlowProps {
  serviceJson: FlowJson;
  agentJson: AgentConfig;
  backendRes: Record<string, Record<string, any>>;
  onFlowChange?: (data: { nodes: Node[]; edges: Edge[] }) => void;
  height?: string | number;
  width?: string | number;
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const proOptions = { hideAttribution: true };

const BasicFlow: React.FC<BasicFlowProps> = ({
  serviceJson,
  agentJson,
  backendRes,
  onFlowChange,
  height = "100vh",
  width = "100%",
}) => {
  const { fitView } = useReactFlow();

  const nodeOptions = convertBackendRes(backendRes);
  const reactFlowWrapper = useRef(null);

  const [history, setHistory] = useState<HistorySnapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const changeSourceRef = useRef<"drag" | "manual" | null>(null);

  const reactflow = useReactFlow();

  // State to maintain agent data changes
  const [currentAgentData, setCurrentAgentData] =
    useState<AgentConfig>(agentJson);

  // State to control sidebar visibility
  const [showDefaultSidebar, setShowDefaultSidebar] = useState<boolean>(true);

  // State to track agent data from abilities when showing ability agent details
  const [abilityAgentData, setAbilityAgentData] = useState<AgentConfig | null>(
    null
  );

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
  const [currEdge, setCurrEdge] = useState<Edge | null>(null);
  const [addMenuFocus, setAddMenuFocus] = useState(false);

  const nodesInitialized = useNodesInitialized();
  const [initial, setInitial] = useState(true);

  const normalizedNodes: Node[] = serviceJson.nodes.map((ele) => ({
    ...ele,
    type: ele.type ?? "custom",
    position: ele.position ?? { x: 0, y: 0 },
    data: {
      ...ele.data,
      isIsland: false,
    },
  }));

  const normalizedEdges: Edge[] = serviceJson.edges.map((ele) => ({
    ...ele,
    type: "custom",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 25,
      height: 25,
    },
  }));

  const [nodes, setNodes] = useNodesState(normalizedNodes);
  const [edges, setEdges] = useEdgesState(normalizedEdges);

  const updateHistory = (
    nodes: Node[],
    edges: Edge[],
    history: HistorySnapshot[],
    setHistory: React.Dispatch<React.SetStateAction<HistorySnapshot[]>>,
    historyIndex: number,
    setHistoryIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const sanitizedSnapshot: HistorySnapshot = {
      nodes: nodes.map(sanitizeNode),
      edges: edges.map(sanitizeEdge),
    };

    const lastSnapshot = history[historyIndex];

    if (!equal(sanitizedSnapshot, lastSnapshot)) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(sanitizedSnapshot);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (historyIndex > 1) {
      const prev = history[historyIndex - 1];

      setCurrNode(null);
      setAbilityAgentData(null);

      const restoredNodes = prev.nodes.map((partialNode) => {
        const fullNode = nodes.find((n) => n.id === partialNode.id);
        // Ensure we always return a fully defined node
        return {
          ...fullNode,
          ...partialNode,
          id: partialNode.id!, // non-null assertion since history should always have an id
          position: partialNode.position
            ? partialNode.position
            : fullNode?.position, // same as above
          data: partialNode.data!, // same
        } as Node;
      });

      const restoredEdges = prev.edges.map((partialEdge) => {
        const fullEdge = edges.find((e) => e.id === partialEdge.id);
        return {
          ...fullEdge,
          ...partialEdge,
          id: partialEdge.id!, // required
          source: partialEdge.source!, // required
          target: partialEdge.target!, // required
        } as Edge;
      });

      setNodes(restoredNodes);
      setEdges(restoredEdges);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];

      const restoredNodes = next.nodes.map((partialNode) => {
        const fullNode = nodes.find((n) => n.id === partialNode.id);
        return {
          ...fullNode,
          ...partialNode,
          id: partialNode.id!, // non-null assertion since history should always have an id
          position: partialNode.position
            ? partialNode.position
            : fullNode?.position, // same as above
          data: partialNode.data!, // same
        } as Node;
      });

      const restoredEdges = next.edges.map((partialEdge) => {
        const fullEdge = edges.find((e) => e.id === partialEdge.id);
        return {
          ...fullEdge,
          ...partialEdge,
          id: partialEdge.id!, // required
          source: partialEdge.source!, // required
          target: partialEdge.target!, // required
        } as Edge;
      });

      setNodes(restoredNodes);
      setEdges(restoredEdges);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Sync state with prop changes
  useEffect(() => {
    setCurrentAgentData(agentJson);
  }, [agentJson]);

  const handleAgentDataChange = useCallback((updatedData: AgentConfig) => {
    setCurrentAgentData(updatedData);
    console.log("Agent data updated:", updatedData);
    console.log("Agent Instructions - Parent Update:", {
      agentTitle: updatedData.title,
      roleSetting: updatedData.role_setting,
      provider: updatedData.provider,
      modelId: updatedData.model_id,
    });
  }, []);

  const onEdgeDoubleClick: EdgeMouseHandler = (
    event: React.MouseEvent,
    edge: Edge
  ) => {
    event.stopPropagation();

    // Show sidebar if it's hidden
    if (!showDefaultSidebar) {
      setShowDefaultSidebar(true);
    }

    setCurrEdge(edge);
    setCurrNode(null); // Clear node selection when edge is selected
    setAbilityAgentData(null); // Clear ability agent data
    console.log("Double clicked edge:", edge);
  };

  useEffect(() => {
    if (
      changeSourceRef.current === "manual" ||
      changeSourceRef.current === null
    ) {
      updateHistory(
        nodes,
        edges,
        history,
        setHistory,
        historyIndex,
        setHistoryIndex
      );
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (onFlowChange) {
      onFlowChange({ nodes, edges });
    }
  }, [nodes, edges, onFlowChange]);

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
        setTimeout(() => TestForIsland(), 0);
        if (changeSourceRef.current != "drag") {
          changeSourceRef.current = "manual";
        }
        return updated;
      });
    },
    [changeSourceRef]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const updated = applyEdgeChanges(changes, eds);
        setTimeout(() => TestForIsland(), 0);
        if (changeSourceRef.current != "drag") {
          changeSourceRef.current = "manual";
        }
        return updated;
      });
    },
    [setEdges, changeSourceRef]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const updated = addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 25,
              height: 25,
            },
          },
          eds
        );
        setTimeout(() => TestForIsland(), 0);
        return updated;
      });
    },
    [setEdges]
  );

  const handleDragStart = useCallback(() => {
    changeSourceRef.current = "drag";
  }, [changeSourceRef]);

  const handleDragStop = useCallback(() => {
    changeSourceRef.current = null;
  }, [changeSourceRef]);

  const onNodeDoubleClick: NodeMouseHandler = (
    event: React.MouseEvent,
    node: Node
  ) => {
    event.stopPropagation();
    if (!showDefaultSidebar) {
      setShowDefaultSidebar(true);
    }

    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                style: {
                  borderColor: "#6C5CE7",
                },
              },
            }
          : {
              ...n,
              data: {
                ...n.data,
                style: {},
              },
            }
      )
    );

    // Check if this is an agent node
    if (node.data.type === "agent") {
      // Find the agent in the abilities array
      const agentAbility = currentAgentData.abilities.find((ability) => {
        const abilityTitle =
          typeof ability === "string" ? ability : ability.title;
        return (
          abilityTitle === node.data.title ||
          (typeof ability !== "string" && ability.id === node.data.id)
        );
      });

      if (
        agentAbility &&
        typeof agentAbility !== "string" &&
        agentAbility.fullAgentData
      ) {
        // Set the ability agent data to show in the default sidebar
        setAbilityAgentData(agentAbility.fullAgentData);
        setCurrNode(null); // Clear current node to show default sidebar
        setShowDefaultSidebar(true); // Ensure sidebar is visible
        console.log(
          "Double clicked agent node, showing ability agent data:",
          agentAbility.fullAgentData
        );
      } else {
        console.log(
          "Agent ability not found or no fullAgentData:",
          node.data.title
        );
        // Fallback to regular node handling
        setCurrNode(node);
        setAbilityAgentData(null);
      }
    } else {
      // Regular node handling
      setCurrNode(node);
      setAbilityAgentData(null);
    }

    setCurrEdge(null);
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
    [nodes, edges, setNodes, setEdges, fitView]
  );

  function TestForIsland() {
    const startingNode = nodes.find((ele) => ele.data.type === "trigger");
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
    <div style={{ width, height, display: "flex", minHeight: "500px" }}>
      <div style={{ flex: 1, height: "100%" }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStart={handleDragStart}
          onNodeDragStop={handleDragStop}
          onNodeClick={onNodeDoubleClick}
          onEdgeClick={onEdgeDoubleClick}
          fitView
          fitViewOptions={{ duration: 0 }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          minZoom={0.1}
          onPaneClick={() => setAddMenuFocus(false)}
        >
          <Background bgColor="#f6f7fc" color="#dee3ed" size={3} />
          <CustomControls
            undo={undo}
            redo={redo}
            addMenuFocus={addMenuFocus}
            setAddMenuFocus={setAddMenuFocus}
            onToggleSettings={() => {
              setShowDefaultSidebar(!showDefaultSidebar);
              if (!showDefaultSidebar) {
                setAbilityAgentData(null); // Clear ability agent data when showing sidebar
              }
            }}
            backendAbilityRes={backendRes}
          />
          {modalData && (
            <NodeSelectionModal
              onClose={() => setModalData(null)}
              nodeOptionsJson={nodeOptions}
              onSelect={(newNode) => {
                const rawTitle = newNode.data.title || "node";
                const baseId = rawTitle.toLowerCase().replace(/\s+/g, "_");

                // Ensure unique ID
                const existingIds = nodes.map((n) => n.id);
                let newId = baseId;
                let counter = 1;
                while (existingIds.includes(newId)) {
                  newId = `${baseId}_${counter++}`;
                }

                const position = { x: 300, y: 300 };
                const existing_pos = nodes.find(
                  (ele) => ele.id === modalData.nodeId
                )?.position;

                switch (modalData.handleId) {
                  case `${modalData.nodeId}-right`:
                    position.x = (existing_pos?.x ?? 0) + 400;
                    position.y = existing_pos?.y ?? 0;
                    break;
                  case `${modalData.nodeId}-left`:
                    position.x = (existing_pos?.x ?? 0) - 400;
                    position.y = existing_pos?.y ?? 0;
                    break;
                  case `${modalData.nodeId}-top`:
                    position.y = (existing_pos?.y ?? 0) - 100;
                    position.x = existing_pos?.x ?? 0;
                    break;
                  case `${modalData.nodeId}-bottom`:
                    position.y = (existing_pos?.y ?? 0) + 200;
                    position.x = existing_pos?.x ?? 0;
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
                    type: "custom",
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
          {showDefaultSidebar && (
            <Panel position="top-right" style={{ margin: 0, padding: 0 }}>
              <div className="reactflow-sidebar-panel">
                {/* Close button for sidebar */}
                <div
                  className="sidebar-close-button"
                  onClick={() => {
                    // If there's a current node, just clear it and show default sidebar
                    if (currNode) {
                      setCurrNode(null);
                      setAbilityAgentData(null);
                    } else if (currEdge) {
                      // If there's a current edge, clear it and show default sidebar
                      setCurrEdge(null);
                      setAbilityAgentData(null);
                    } else if (abilityAgentData) {
                      // If showing agent details from double-click, clear ability data and show original default
                      setAbilityAgentData(null);
                    } else {
                      // Only hide entire sidebar if we're showing original default content
                      setShowDefaultSidebar(false);
                      setAbilityAgentData(null);
                    }
                  }}
                >
                  <X size={16} />
                </div>

                {!currNode && !currEdge ? (
                  <Default
                    data={abilityAgentData || currentAgentData} // Use ability agent data if available, otherwise use main agent data
                    modal={false}
                    onDataChange={
                      abilityAgentData ? undefined : handleAgentDataChange
                    } // Only allow changes to main agent data, not ability agent data
                  />
                ) : currEdge ? (
                  <EdgeSidebar
                    edge={currEdge}
                    nodes={nodes}
                    onClose={() => {
                      setCurrEdge(null);
                      setAbilityAgentData(null);
                    }}
                    onSave={(updatedEdge) => {
                      setEdges((edges) =>
                        edges.map((ed) =>
                          ed.id === updatedEdge.id ? updatedEdge : ed
                        )
                      );
                      setCurrEdge(null);
                    }}
                  />
                ) : currNode ? (
                  <div className="custom-box">
                    <SideBarHeader
                      icon={
                        currNode.data.icon == ""
                          ? "zap"
                          : (currNode.data.icon as string)
                      }
                      title={currNode.data.title as string}
                      onClose={() => {
                        // Only clear node state, keep sidebar visible to show default content
                        setCurrNode(null);
                        setAbilityAgentData(null);
                        // DON'T call setShowDefaultSidebar(false) here
                      }}
                    />
                    <NodeContent data={currNode} />
                  </div>
                ) : null}
              </div>
            </Panel>
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default BasicFlow;

export const flowWrapper: React.FC<BasicFlowProps> = ({
  serviceJson,
  agentJson,
  backendRes,
  onFlowChange,
  height = "100vh",
  width = "100%",
}) => {
  return (
    <div
      style={{
        width,
        height,
        minHeight: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ReactFlowProvider>
        <BasicFlow
          serviceJson={serviceJson}
          agentJson={agentJson}
          backendRes={backendRes}
          onFlowChange={onFlowChange}
          height={height}
          width={width}
        />
      </ReactFlowProvider>
    </div>
  );
};
