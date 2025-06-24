import { useReactFlow } from "@xyflow/react";

export function useFlowJson() {
  const { getNodes, getEdges } = useReactFlow();

  const getFlowJson = () => {
    const nodes = getNodes().map(({ position, ...rest }) => rest); // Remove position
    const edges = getEdges();
    return { nodes, edges };
  };

  return getFlowJson;
}
