import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@fontsource/inter/400.css'
import './index.css'
import { App } from "./App.tsx";
import { BasicFlowProps } from "./components/BasicFlow.tsx";
import { flowJson, SideBarJson } from "./testJson/FlowJson.ts";

const props: BasicFlowProps = { flowJson: flowJson, sidebarJson: SideBarJson };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...props} />
  </StrictMode>
);
