import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BasicFlowProps } from "./components/BasicFlow.tsx";
import { flowJson } from "./testJson/FlowJson.ts";
import { testJson } from "./components/sidebar/testingSideBarJson.tsx";

const props: BasicFlowProps = { flowJson: flowJson, sidebarJson: testJson };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
