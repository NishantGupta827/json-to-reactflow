import { CustomNodeData, InputField } from "@/types/nodes";
import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

export type StyleNodeProps = {
  id: string;
  data: CustomNodeData;
  sidebar: Boolean;
};

export default function StyledNode({ id, data, sidebar }: StyleNodeProps) {
  const { setNodes } = useReactFlow();
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

  const {
    label = "",
    inputs = [],
    shape = "rectangle",
    editable = false,
  } = data as CustomNodeData;

  const isDiamond = shape === "diamond";

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

  return (
    <div style={labelWrapperStyle}>
      {inputs.length > 0 ? (
        editable ? (
          inputs.map((input: InputField) =>
            input.type === "dropdown" ? (
              <Select
                key={input.key}
                value={input.value}
                onValueChange={(val) => onInputChange(val, input.key)}
                disabled={sidebar as boolean}
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
                disabled={sidebar as boolean}
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
          disabled={sidebar as boolean}
        />
      ) : (
        <div className="text-sm font-light text-center">{label}</div>
      )}
    </div>
  );
}
