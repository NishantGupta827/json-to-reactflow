import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
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
import { getLayoutedElements } from "@/utils/layoutUtil";
import useUndoRedo from "@/hooks/useUndoRedo";
import { FlaskConical } from "lucide-react";
import { NodeSelectionModal } from "./node/AgentNodeContent";
import AgentNodeWrapper from "./node/GenericRevisedNode";
import { Default } from "./rightSidebar/agent";
import { AgentConfig } from "@/types/agent";
import NodeContent from "./rightSidebar/node";
import { SideBarHeader } from "./rightSidebar/header";
import { ServiceStep } from "@/types/service";
import { ServiceToFlow } from "@/util/ServiceToFlow";
import { useFlowJson } from "@/hooks/useFlowJson";

export interface BasicFlowProps {
  serviceJson: ServiceStep[];
  agentJson: AgentConfig;
  nodeOptions: NodeOptionsJson;
}

export type NodeCategory = "tools" | "agents" | "automations" | "triggers";

export interface NodeData {
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

export interface NodeDefinition {
  id: string;
  data: NodeData;
}

export interface NodeOption {
  id: string;
  label: string;
  node: NodeDefinition;
}

export type NodeOptionsJson = {
  [K in NodeCategory]: NodeOption[];
};

const proOptions = { hideAttribution: true };

const BasicFlow: React.FC<BasicFlowProps> = ({
  serviceJson,
  agentJson,
  nodeOptions,
}) => {
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
  const [labelModal, setLabelModal] = useState<{
    edge: Edge;
    label: string;
  } | null>(null);

  const onEdgeDoubleClick: EdgeMouseHandler = (
    event: React.MouseEvent,
    edge: Edge
  ) => {
    event.stopPropagation();
    setLabelModal({
      edge,
      label: typeof edge.label === "string" ? edge.label : "",
    });
  };

  const flowJson = ServiceToFlow(serviceJson);
  // useEffect(() => {
  //   console.log("flowJson", JSON.stringify(flowJson));
  // }, [flowJson]);

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

  const getFlowJson = useFlowJson();

  const handleExport = () => {
    const updatedFlowJson = getFlowJson();

    if (!updatedFlowJson.nodes.length) {
      alert("Flow not loaded yet.");
      return;
    }
    console.log("Exported Flow:", updatedFlowJson);
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
          onEdgeDoubleClick={onEdgeDoubleClick}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
        >
          {
            <Controls>
              {<DownloadButton />}
              <ControlButton>
                <FlaskConical onClick={() => console.log(TestForIsland())} />
              </ControlButton>
              <ControlButton onClick={handleExport}>e</ControlButton>
              <Import />
              <Export />
            </Controls>
          }
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
          {labelModal && (
            <div className="edge-label-modal-overlay">
              <div className="edge-label-modal">
                <h3 className="edge-label-modal-title">Edit Edge Label</h3>
                <input
                  type="text"
                  className="edge-label-input"
                  value={labelModal.label}
                  onChange={(e) =>
                    setLabelModal(
                      (prev) => prev && { ...prev, label: e.target.value }
                    )
                  }
                />
                <div className="edge-label-modal-actions">
                  <button
                    className="edge-label-save"
                    onClick={() => {
                      setEdges((edges) =>
                        edges.map((ed) =>
                          ed.id === labelModal.edge.id
                            ? { ...ed, label: labelModal.label }
                            : ed
                        )
                      );
                      setLabelModal(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="edge-label-cancel"
                    onClick={() => setLabelModal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
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
  serviceJson,
  agentJson,
  nodeOptions,
}) => {
  return (
    <ReactFlowProvider>
      <BasicFlow
        serviceJson={serviceJson}
        agentJson={agentJson}
        nodeOptions={nodeOptions}
      />
    </ReactFlowProvider>
  );
};
