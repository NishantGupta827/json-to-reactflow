import { useReactFlow, NodeProps, Edge } from "@xyflow/react";
import AgentNodeContent from "./AgentNodeContent";

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

export default function AgentNodeWrapper(
  props: NodeProps & {
    onHandleClick: AgentNodeProps["onHandleClick"];
  }
) {
  const { getEdges } = useReactFlow();
  const edges = getEdges();

  return (
    <AgentNodeContent
      {...props}
      edges={edges}
      onHandleClick={props.onHandleClick}
    />
  );
}
