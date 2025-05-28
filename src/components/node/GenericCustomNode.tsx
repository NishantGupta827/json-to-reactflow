import {
  Handle,
  Position,
  useConnection,
  useNodeConnections,
  type NodeProps,
} from "@xyflow/react";
import { useRef, useLayoutEffect } from "react";
import { CustomNodeData, shapeStyles } from "@/types/nodes";
import StyledNode from "./StyledNode";

export default function CustomNode({ id, data }: NodeProps) {
  const connection = useConnection();
  const nodeRef = useRef<HTMLDivElement>(null);

  const {
    bgColor = "#ffffff",
    textColor = "#000000",
    borderColor = "#D3D3D3",
    borderWidth = 0.5,
    shape = "rectangle",
    incoming = Infinity,
    outgoing = Infinity,
  } = data as CustomNodeData;

  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const isDiamond = shape === "diamond";
  const size = 70;

  useLayoutEffect(() => {
    if (!isDiamond || !nodeRef.current) return;

    const node = nodeRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width !== height) {
        const newSize = Math.max(width, height);
        node.style.width = `${newSize}px`;
        node.style.height = `${newSize}px`;
      }
    });

    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [isDiamond]);

  const baseStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: bgColor,
    color: textColor,
    border: `${borderWidth}px solid ${borderColor}`,
    padding: 10,
    textAlign: "center",
    minWidth: isDiamond ? size : "110px",
    minHeight: isDiamond ? size : "70px",
    width: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    ...shapeStyles[shape],
  };

  const dragHandleStyle: React.CSSProperties = {
    position: "absolute",
    top: -10,
    left: isDiamond ? -10 : "50%",
    transform: isDiamond ? "" : "translateX(-50%)",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    borderRadius: "75%",
    cursor: "grab",
    zIndex: 10,
    pointerEvents: "auto",
  };

  const source_conn = useNodeConnections({
    handleType: "source",
  });

  const target_conn = useNodeConnections({
    handleType: "target",
  });

  return (
    <div style={baseStyle} ref={nodeRef}>
      {/* Handles */}
      {!connection.inProgress && (
        <Handle
          className="customHandle"
          position={Position.Right}
          type="source"
          isConnectable={source_conn.length < outgoing}
        />
      )}
      {(!connection.inProgress || isTarget) && (
        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
          isConnectable={target_conn.length < incoming}
        />
      )}

      {/* Styled Node */}
      <StyledNode id={id} data={data as CustomNodeData} sidebar={false} />
      <span className="drag-handle" style={dragHandleStyle} />
    </div>
  );
}
