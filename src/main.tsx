import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "./index.css";
import { App } from "./App.tsx";
import { agentJson } from "./testJson/AgentJson.ts";
import { updatedServiceJson } from "./testJson/ServiceJson.ts";
import { backendRes } from "./testJson/BackendResponse.ts";
import { BasicFlowProps } from "./components/flow/BasicFlow.tsx";

const props: BasicFlowProps = {
  serviceJson: updatedServiceJson,
  agentJson: agentJson,
  backendRes: backendRes,
  onFlowChange: (data) => {
    console.log("Flow updated:", data);
    console.log("Nodes count:", data.nodes.length);
    console.log("Edges count:", data.edges.length);
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
