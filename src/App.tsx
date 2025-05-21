import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import { flowJson } from "./TestJson";

const props: BasicFlowProps = { json: flowJson };

export const App = () => {
  return <>{flowWrapper(props)}</>;
};
