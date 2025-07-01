import { Edge, Handle, Position } from "@xyflow/react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonHandle } from "../ui/ButtonHandle";
import "./AgentNode.css";
import { NodeOptionsJson } from "../BasicFlow";

type AgentNodeProps = {
  data: any;
  id: string;
  edges: Edge[];
  onHandleClick: (info: {
    nodeId: string;
    handleId: string;
    type: "source" | "target";
    nodeData: any;
  }) => void;
};

export default function AgentNodeContent({
  data,
  id,
  edges,
  onHandleClick,
}: AgentNodeProps) {

  const isConnected = (handleId: string, type: "source" | "target") => {
    return edges.some((edge) => {
      return type === "source"
        ? edge.source === id && edge.sourceHandle === handleId
        : edge.target === id && edge.targetHandle === handleId;
    });
  };

  const renderHandle = (
    positionName: "top" | "right" | "bottom" | "left",
    type: "source" | "target",
    position: Position
  ) => {
    const handleId = `${id}-${positionName}`;
    const connected = isConnected(handleId, type);

    if (connected) {
      return (
        <Handle
          type={type}
          position={position}
          id={handleId}
          style={{
            background: "#3b82f6",
            width: 10,
            height: 10,
            borderColor: "white",
            borderWidth: 1.5,
            zIndex: 10,
          }}
        />
      );
    }

    return (
      <ButtonHandle
        type={type}
        position={position}
        id={handleId}
        className="handle-wrapper"
        style={{
          background: "#3b82f6",
          width: 10,
          height: 10,
          borderColor: "white",
          borderWidth: 1.5,
          zIndex: 10,
        }}
      >
        <button
          className="handle-button"
          onClick={(e) => {
            e.stopPropagation();
            onHandleClick?.({
              nodeId: id,
              handleId,
              type,
              nodeData: data,
            });
          }}
        >
          <Plus size={10} />
        </button>
      </ButtonHandle>
    );
  };

  const convertIconName = (iconName: string): string => {
    return iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  let IconComponent: ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  > = LucideIcons.Zap;

  if (data.icon && typeof data.icon === "string") {
    const convertedIconName = convertIconName(data.icon);
    
    if (LucideIcons[convertedIconName as keyof typeof LucideIcons]) {
      IconComponent = LucideIcons[
        convertedIconName as keyof typeof LucideIcons
      ] as ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
    }
  }

  return (
    <div className="agent-node-container">
      <div className={`${data.isIsland ? "island-node" : "agent-node-card"}`}>
        <div className="agent-node-header">
          <div className="agent-node-icon-box">
            <IconComponent className="agent-node-icon" />
          </div>
          <div className="agent-node-text">
            <div className="agent-node-title">{data.title}</div>
            <div className="agent-node-description">{data.description}</div>
          </div>
        </div>
      </div>

      {renderHandle("top", "target", Position.Top)}
      {renderHandle("right", "source", Position.Right)}
      {renderHandle("bottom", "source", Position.Bottom)}
      {renderHandle("left", "source", Position.Left)}

      {/* {showModal && clickedHandle && (
        <NodeSelectionModal
          onClose={() => setShowModal(false)}
          onSelect={handleNodeSelect}
        />
      )} */}
    </div>
  );
}

type Category = "tools" | "agents" | "automations" | "triggers";

export function NodeSelectionModal({
  onClose,
  onSelect,
  nodeOptionsJson,
}: {
  onClose: () => void;
  onSelect: (node: any) => void;
  nodeOptionsJson: NodeOptionsJson;
}) {
  const [category, setCategory] = useState<Category>("tools");
  const nodes = nodeOptionsJson[category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sidebar">
          {(["tools", "agents", "automations", "triggers"] as Category[]).map(
            (cat) => (
              <button
                key={cat}
                className={`modal-category-btn ${
                  category === cat ? "active" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            )
          )}
        </div>

        <div className="modal-main">
          <div className="modal-header">
            <h2>Select next step</h2>
            <button className="close-btn" onClick={onClose}>
              x
            </button>
          </div>

          <div className="modal-subheader">
            <input
              className="search-input"
              placeholder="Search apps..."
              type="text"
            />
            <button className="browse-btn">Browse</button>
          </div>

          <div className="modal-grid">
            {nodes.map((item) => (
              <div
                key={item.id}
                className="modal-node-card"
                onClick={() => onSelect(item.node)}
              >
                <div className="node-title">{item.node.data.title}</div>
                <div className="node-description">
                  {item.node.data.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

