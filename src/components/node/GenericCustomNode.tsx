import {
  Handle,
  Position,
  useConnection,
  useNodeConnections,
  useReactFlow,
  type NodeProps,
} from "@xyflow/react";
import { useCallback, useRef, useLayoutEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomNodeData, InputField, shapeStyles } from "@/types/nodes";

export default function CustomNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();
  const connection = useConnection();
  const nodeRef = useRef<HTMLDivElement>(null);

  const {
    label = "",
    inputs = [],
    bgColor = "#ffffff",
    textColor = "#000000",
    borderColor = "#D3D3D3",
    borderWidth = 0.5,
    shape = "rectangle",
    editable = false,
    incoming = Infinity,
    outgoing = Infinity,
  } = data as CustomNodeData;

  const onInputChange = useCallback(
    (value: string, key: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== id) return node;

          const data = node.data as CustomNodeData;

          const updatedInputs = (data.inputs || []).map((input) =>
            input.key === key ? { ...input, value } : input
          );

          return {
            ...node,
            data: {
              ...data,
              inputs: updatedInputs,
            },
          };
        })
      );
    },
    [id, setNodes]
  );

  const onLabelChange = useCallback(
    (value: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== id) return node;

          const data = node.data as CustomNodeData;

          return {
            ...node,
            data: {
              ...data,
              label: value,
            },
          };
        })
      );
    },
    [id, setNodes]
  );

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

  const labelWrapperStyle: React.CSSProperties = {
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: inputs.length > 0 ? "13px" : "",
    gap: 6,
    ...(isDiamond ? { transform: "rotate(-45deg)" } : {}),
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

      {/* Inputs or fallback label */}
      <div style={labelWrapperStyle}>
        {inputs.length > 0 ? (
          editable ? (
            inputs.map((input: InputField) =>
              input.type === "dropdown" ? (
                <Select
                  key={input.key}
                  value={input.value}
                  onValueChange={(val) => onInputChange(val, input.key)}
                >
                  <SelectTrigger className="w-[100px] text-xs z-[1000]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {input.options?.map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-xs">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  key={input.key}
                  value={input.value}
                  onChange={(e) => onInputChange(e.target.value, input.key)}
                  className="font-[305] h-8 w-[100px] z-[1000]"
                />
              )
            )
          ) : (
            inputs.map((input: InputField) => (
              <div key={input.key} className="text-xs text-center">
                {input.value}
              </div>
            ))
          )
        ) : editable ? (
          <Input
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            className="w-[100px] text-xs h-8 text-center z-[1000]"
          />
        ) : (
          <div className="text-sm font-light text-center">{label}</div>
        )}
      </div>

      <span className="drag-handle" style={dragHandleStyle} />
    </div>
  );
}
