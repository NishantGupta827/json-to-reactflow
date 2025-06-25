import React from "react";
import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import '@fontsource/inter/400.css'
import './index.css'

export const App: React.FC<BasicFlowProps> = (props: BasicFlowProps) => {
  return flowWrapper(props);
};
