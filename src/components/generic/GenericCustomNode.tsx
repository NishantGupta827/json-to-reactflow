import {
  Handle,
  Position,
  useConnection,
  useReactFlow,
  type NodeProps,
} from "@xyflow/react";
import { useCallback } from "react";

const positionMap: Record<"top" | "bottom" | "left" | "right", Position> = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

const shapeStyles: Record<string, React.CSSProperties> = {
  rectangle: {},
  circle: { borderRadius: "50%" },
  rounded: { borderRadius: "12px" },
  diamond: {
    transform: "rotate(45deg)",
  },
};

type HandleConfig = {
  id: string;
  type: "source" | "target";
  position: keyof typeof positionMap;
  style?: React.CSSProperties;
};

export type CustomNodeData = {
  label?: string;
  shape?: keyof typeof shapeStyles;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  handles?: HandleConfig[];
  editable?: boolean;
};

export default function CustomNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();
  const connection = useConnection();

  const {
    label = "",
    bgColor = "#ffffff",
    textColor = "#000000",
    borderColor = "#000000",
    borderWidth = 1,
    shape = "rectangle",
    handles = [],
    editable = false,
  } = data as CustomNodeData;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLabel = e.target.value;
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  const labelWrapperStyle: React.CSSProperties = {
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const isDiamond = shape === "diamond";

  const size = 70;

  const baseStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: bgColor,
    color: textColor,
    border: `${borderWidth}px solid ${borderColor}`,
    padding: 10,
    textAlign: "center",
    width: isDiamond ? size : "110px",
    height: isDiamond ? size : "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
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
    //border: "0.5px solid #000",
    borderRadius: "75%",
    cursor: "grab",
    zIndex: 10,
    pointerEvents: "auto",
  };

  return (
    <div style={baseStyle}>
      {/* Handles */}
      {!connection.inProgress && (
        <Handle
          className="customHandle"
          position={Position.Right}
          type="source"
        />
      )}
      {(!connection.inProgress || isTarget) && (
        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
        />
      )}

      {/* Label */}
      <div style={labelWrapperStyle}>
        {editable ? (
          <input
            type="text"
            defaultValue={label}
            onChange={onChange}
            className="nodrag"
            style={{
              width: "90%",
              textAlign: "center",
              background: "transparent",
              color: textColor,
              border: "none",
              outline: "none",
            }}
          />
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>{label}</div>
        )}
      </div>
      <span className="drag-handle" style={dragHandleStyle} />
    </div>
  );
}
