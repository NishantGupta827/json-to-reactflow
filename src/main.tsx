import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "./index.css";
import { App } from "./App.tsx";
import { BasicFlowProps } from "./components/BasicFlow.tsx";
import { flowJson } from "./testJson/FlowJson.ts";
import { agentJson } from "./testJson/AgentJson.ts";
import { ServiceToFlow } from "./util/ServiceToFlow.ts";
import { ServiceJson } from "./testJson/ServiceJson.ts";
// import '@contentstack/venus-components/build/main.css';

const props: BasicFlowProps = {
  flowJson: ServiceToFlow(ServiceJson),
  agentJson: agentJson,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
