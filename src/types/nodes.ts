import { Position } from "@xyflow/react";

export type CustomNodeData = {
  id?: string;
  label?: string;
  shape?: keyof typeof shapeStyles;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  handles?: HandleConfig[];
  editable?: boolean;
  inputs?: InputField[];
  incoming?: number;
  outgoing?: number;
};

export type InputField = {
  type: "text" | "dropdown";
  key: string; // unique identifier for the input
  label?: string;
  value: string;
  options?: string[]; // only for dropdown
};

export const shapeStyles: Record<string, React.CSSProperties> = {
  rectangle: {},
  circle: { borderRadius: "50%" },
  rounded: { borderRadius: "12px" },
  diamond: {
    transform: "rotate(45deg)",
  },
};

//Ask nishant do we need these?
type HandleConfig = {
  id: string;
  type: "source" | "target";
  position: keyof typeof positionMap;
  style?: React.CSSProperties;
};

const positionMap: Record<"top" | "bottom" | "left" | "right", Position> = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};
