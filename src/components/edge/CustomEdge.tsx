import { type FC } from "react";
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

  const displayLabel = data?.label;
  const outcomeLabel = label;

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      {displayLabel && outcomeLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              padding: "6px 10px",
              borderRadius: "8px",
              border: "#DDE3EE solid 2px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              pointerEvents: "all",
              cursor: "default",
              width: "200px",
              textAlign: "center",
              color: "rgba(0, 58, 37, 1)",
              background: "rgba(245, 255, 252, 1)",
            }}
            className="edge-label-renderer__custom-edge nodrag nopan"
          >
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {displayLabel + " - "}
            </span>
            <span style={{ fontWeight: "400" }}> {outcomeLabel}</span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;
