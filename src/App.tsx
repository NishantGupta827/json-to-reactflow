import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import '@fontsource/inter/400.css'
import './index.css'

export const App = (props: BasicFlowProps) => {
  return <>{flowWrapper(props)}</>;
};
