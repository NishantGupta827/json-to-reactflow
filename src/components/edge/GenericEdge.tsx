import {
  EdgeProps,
  getBezierPath,
  useReactFlow,
  BaseEdge,
  EdgeLabelRenderer,
} from "@xyflow/react";
import { Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { setEdges } = useReactFlow();
  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="edge-label-renderer__custom-edge nodrag nopan pointer-events-auto"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdgeClick();
            }}
            className="w-[30px] h-[30px] border-[5px] border-[#f7f9fb] bg-[#f3f3f4] text-black cursor-pointer rounded-full text-[12px] pt-0 hover:bg-[#f3f3f4] hover:text-black hover:border-[#f7f9fb]"
          >
            <Trash2 />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
