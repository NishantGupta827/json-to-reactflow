import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Checkbox,
  ToggleSwitch,
} from "@contentstack/venus-components";
import "@contentstack/venus-components/build/main.css";
import { Handle, Position } from "@xyflow/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust path as needed

export interface InputField {
  name: string;
  label?: string;
  placeholder?: string;
  type: "text" | "dropdown" | "checkbox" | "switch";
  options?: string[];
  defaultValue?: any;
  handlePresent?: boolean;
}

interface NodeInputsRendererProps {
  inputs: InputField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  nodeId: string;
}

const NodeInputsRenderer: React.FC<NodeInputsRendererProps> = ({
  inputs,
  values,
  onChange,
  nodeId,
}) => {
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    inputRefs.current = []; // clear before refilling
    const tops = inputs.map((_, idx) => {
      const ref = inputRefs.current[idx];
      return ref?.offsetTop! + (ref?.offsetHeight || 0) / 2;
    });
    setPositions(tops);
  }, [inputs]);

  return (
    <div className="space-y-4">
      {inputs.map((input, index) => {
        const {
          name,
          label,
          placeholder,
          type,
          options = [],
          handlePresent,
        } = input;

        const value = values[name] ?? input.defaultValue;

        return (
          <div
            key={name}
            className="relative venus-component mb-10"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          >
            {type === "text" && (
              <div className="space-y-1">
                {label && (
                  <div className="text-sm font-medium text-gray-700">
                    {label}
                  </div>
                )}
                <TextInput
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={(e: { target: { value: string } }) =>
                    onChange(name, e.target.value)
                  }
                  version="v2"
                />
              </div>
            )}

            {type === "dropdown" && (
              <div className="space-y-1">
                {label && (
                  <label className="text-sm font-medium">{label}</label>
                )}
                <Select
                  value={value}
                  onValueChange={(val) => onChange(name, val)}
                >
                  <SelectTrigger className="w-full rounded-[4px] bg-white">
                    <SelectValue
                      placeholder={placeholder || "Select an option"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[1000]">
                    {options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="dropdown-style"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {type === "checkbox" && (
              <Checkbox
                name={name}
                label={label}
                checked={!!value}
                onChange={(e: { target: { checked: boolean } }) =>
                  onChange(name, e.target.checked)
                }
              />
            )}

            {type === "switch" && (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{label}</label>
                <ToggleSwitch
                  checked={!!value}
                  onChange={() => onChange(name, !value)}
                  onClick={() => onChange(name, !value)}
                  label={label}
                />
              </div>
            )}

            {handlePresent && index < positions.length && (
              <Handle
                type="target"
                position={Position.Left}
                id={`input-${name}`}
                style={{
                  position: "absolute",
                  top: positions[index] ?? 100,
                  left: -10,
                  background: "#3b82f6",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NodeInputsRenderer;
