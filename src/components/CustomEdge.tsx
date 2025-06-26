import { type FC } from "react";
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

const CustomEdge: FC<EdgeProps<Edge<{ label?: string }>>> = ({
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

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      {displayLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              backgroundColor: "#ffffff",
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              color: "#374151",
              pointerEvents: "all",
              cursor: "default",
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
