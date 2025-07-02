import { useState, type FC } from "react";
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

const CustomEdge: FC<EdgeProps<Edge<{ label?: string; focus?: boolean }>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const displayLabel = data?.label || label;

  const [hovered, setHovered] = useState(false);

  const focus = data?.focus;

  const border = focus
    ? "2px solid #3b82f6"
    : hovered
    ? "1px solid #3b82f6"
    : "";

  const background = focus ? "#d8e1f4" : hovered ? "transparent" : "#ffffff";

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      {displayLabel && (
        <EdgeLabelRenderer>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              padding: "6px 10px",
              borderRadius: "8px",
              border: border,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              pointerEvents: "all",
              cursor: "default",
              width: "20%",
              textAlign: "center",
              color: " #3b82f6",
              background: background,
            }}
            className="edge-label-renderer__custom-edge nodrag nopan"
          >
            {displayLabel}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;
