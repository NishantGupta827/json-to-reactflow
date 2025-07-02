import { useReactFlow } from "@xyflow/react";
import { BrushCleaning } from "lucide-react";

export default function ClearButton() {
  const { setNodes, setEdges } = useReactFlow();

  const handleClick = () => {
    setEdges(() => []);
    setNodes(() => []);
  };
  return (
    <div onClick={handleClick}>
      <BrushCleaning />
    </div>
  );
}
