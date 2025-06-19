import { useReactFlow, NodeProps } from "@xyflow/react";
import AgentNodeContent from "./AgentNodeContent";

export default function AgentNodeWrapper(props: NodeProps) {
  const { getEdges } = useReactFlow();
  const edges = getEdges();

  return <AgentNodeContent {...props} edges={edges} />;
}
