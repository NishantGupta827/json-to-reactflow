import { FlowJson } from "../types/flowJson";
import { nodeJson } from "./revisedNodeJson";

export const flowJson: FlowJson = {
  export: true,
  control: true,
  minimap: true,
  background: {
    color: "#000000",
    bgcolor: "#ffffff",
    variant: "cross",
    size: 1,
  },
  nodes: nodeJson,
  edges: [
    {
      id: "e1",
      source: "node_2", // TextInputNode
      target: "node_1", // OpenAIChatNode
      targetHandle: "input-prompt", // matches id={`input-${name}`}
      animated: true,
      label: "Prompt input",
    },
    {
      id: "e2",
      source: "node_3", // SwitchNode
      target: "node_1", // OpenAIChatNode
      targetHandle: "input-temperature",
      animated: true,
      label: "Set Temperature",
    },
    {
      id: "e3",
      source: "node_1", // OpenAIChatNode
      target: "node_4", // ConditionalRouterNode
      animated: true,
      label: "Response → Router",
    },
  ],
};
