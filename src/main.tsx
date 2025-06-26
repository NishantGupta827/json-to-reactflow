import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "./index.css";
import { App } from "./App.tsx";
import { BasicFlowProps } from "./components/BasicFlow.tsx";
import { agentJson } from "./testJson/AgentJson.ts";
import { nodeOptionsJson } from "./testJson/NodeOptions.ts";
import { updatdServiceJson } from "./testJson/ServiceJson.ts";

const props: BasicFlowProps = {
  serviceJson: updatdServiceJson,
  agentJson: agentJson,
  nodeOptions: nodeOptionsJson,
  onFlowChange: (data) => {
    console.log('Flow updated:', data);
    console.log('Nodes count:', data.nodes.length);
    console.log('Edges count:', data.edges.length);
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
