import { Edge, Handle, Position } from "@xyflow/react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Plus } from "lucide-react";
import { ButtonHandle } from "../ui/ButtonHandle";
import "./AgentNode.css";

type AgentNodeProps = {
  data: any;
  id: string;
  edges: Edge[];
};

export default function AgentNodeContent({ data, id, edges }: AgentNodeProps) {
  let IconComponent: ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  > = LucideIcons.Zap;

  if (
    data.icon &&
    typeof data.icon === "string" &&
    LucideIcons[data.icon as keyof typeof LucideIcons]
  ) {
    IconComponent = LucideIcons[
      data.icon as keyof typeof LucideIcons
    ] as ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  }

  const isConnected = (handleId: string, type: "source" | "target") => {
    return edges?.some((edge) => {
      if (type === "source") {
        return edge.source === id && edge.sourceHandle === handleId;
      }
      if (type === "target") {
        return edge.target === id && edge.targetHandle === handleId;
      }
      return false;
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
            width: 9,
            height: 9,
            borderRadius: "50%",
            zIndex: 10,
          }}
        />
      );
    }
  
    return (
      <ButtonHandle type={type} position={position} id={handleId} className="handle-wrapper">
        <button
          className="handle-button"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Clicked handle: ${id}-${positionName}`);
          }}
        >
          <Plus size={10} />
        </button>
      </ButtonHandle>
    );
  };
  

  return (
    <div className="agent-node-container">
      <div className="agent-node-card">
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
    </div>
  );
}
