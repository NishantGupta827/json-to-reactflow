import { flowWrapper, type BasicFlowProps } from "./components/BasicFlow";
import { flowJson } from "./TestJson";
import './index.css';

const props: BasicFlowProps = { json: flowJson };

export const App = () => {
    return <>{flowWrapper(props)}</>;
};
