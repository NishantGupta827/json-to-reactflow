import { useReactFlow } from "@xyflow/react";
import { BrushCleaning } from "lucide-react";

export default function ClearButton() {
  const { setNodes, setEdges } = useReactFlow();

  const handleClick = () => {
    setEdges(() => []);
    setNodes(() => []);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        cursor: "pointer",
      }}
    >
      <BrushCleaning strokeWidth={1} />
    </div>
  );
}
