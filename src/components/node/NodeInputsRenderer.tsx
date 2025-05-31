import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Handle, Position } from "@xyflow/react";

export interface InputField {
  name: string;
  label?: string;
  placeholder?: string;
  type: "text" | "dropdown" | "checkbox" | "switch";
  options?: string[];
  defaultValue?: any;
  handlePresent?: boolean;
  value: string | boolean;
  required?: boolean;
}

interface NodeInputsRendererProps {
  inputs: InputField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  nodeId: string;
  connectedInputs: string[];
}

const NodeInputsRenderer: React.FC<NodeInputsRendererProps> = ({
  inputs,
  values,
  onChange,
  connectedInputs,
}) => {
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    inputRefs.current = [];
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
          required,
        } = input;

        const value = values[name] ?? input.defaultValue ?? "";
        const isDisabled = connectedInputs?.includes(name);

        return (
          <div
            key={name}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="relative space-y-1"
          >
            {type === "text" && (
              <div>
                {label && (
                  <Label className="text-sm">
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </Label>
                )}
                <Input
                  name={name}
                  value={isDisabled ? "Receiving input" : String(value)}
                  placeholder={isDisabled ? "" : placeholder}
                  onChange={(e) => onChange(name, e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                  className="disabled:bg-gray-100"
                />
              </div>
            )}

            {type === "dropdown" && (
              <div>
                {label && (
                  <Label className="text-sm">
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </Label>
                )}
                <Select
                  value={value}
                  onValueChange={(val) => onChange(name, val)}
                  disabled={isDisabled}
                >
                  <SelectTrigger
                    className="w-full"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SelectValue
                      placeholder={placeholder || "Select an option"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={name}
                  checked={!!value}
                  onCheckedChange={(checked) => onChange(name, checked)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                {label && (
                  <Label htmlFor={name}>{required ? `${label}*` : label}</Label>
                )}
              </div>
            )}

            {type === "switch" && (
              <div
                className="flex items-center justify-between"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <Label htmlFor={name} className="text-sm">
                  {required ? `${label}*` : label}
                </Label>
                <Switch
                  id={name}
                  checked={!!value}
                  onCheckedChange={(val) => onChange(name, val)}
                  disabled={isDisabled}
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
                  left: -25,
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
