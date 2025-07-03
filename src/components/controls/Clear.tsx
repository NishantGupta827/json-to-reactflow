import { useReactFlow } from "@xyflow/react";
import { BrushCleaning } from "lucide-react";
import { useState } from "react";

export default function ClearButton() {
  const { setNodes, setEdges } = useReactFlow();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setEdges(() => []);
    setNodes(() => []);
  };
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        backgroundColor: hovered ? "#f3f4f6" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <BrushCleaning strokeWidth={1} />
    </div>
  );
}
