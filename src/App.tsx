import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import { flowJson, sidebarJson } from "./TestJson";
import "./index.css";

const props: BasicFlowProps = { flowJson: flowJson, sidebarJson: sidebarJson };

export const App = () => {
  return <>{flowWrapper(props)}</>;
};
