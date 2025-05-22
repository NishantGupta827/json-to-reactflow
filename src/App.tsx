import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import './index.css';

export const App = (props: BasicFlowProps) => {
  return <>{flowWrapper(props)}</>;
};
