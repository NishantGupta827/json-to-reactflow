import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "./index.css";
import { App } from "./App.tsx";
import { BasicFlowProps } from "./components/BasicFlow.tsx";
import { flowJson } from "./testJson/FlowJson.ts";
import { testSideBar } from "./testJson/TestSideBar.ts";
import { agentJson } from "./testJson/AgentJson.ts";
// import '@contentstack/venus-components/build/main.css';

const props: BasicFlowProps = {
  flowJson: flowJson,
  sidebarJson: testSideBar,
  agentJson: agentJson,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
