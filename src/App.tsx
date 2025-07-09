import React from "react";
import "@fontsource/inter/400.css";
import "./index.css";
import { BasicFlowProps } from ".";
import { flowWrapper } from "./components/flow/BasicFlow";

export const App: React.FC<BasicFlowProps> = (props: BasicFlowProps) => {
  return flowWrapper(props);
};
