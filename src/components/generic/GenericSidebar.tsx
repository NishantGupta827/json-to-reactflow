import React from "react";
import { useDnD } from "../DnD";
import type { CustomNodeData } from "./GenericCustomNode";

export type SideBarProps = {
  name: string;
  shape: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  editable?: boolean;
};

//for the shaping of the nodes
const defaultShapeStyles: Record<string, React.CSSProperties> = {
  rectangle: {},
  circle: { borderRadius: "50%" },
  rounded: { borderRadius: "12px" },
  diamond: {
    transform: "rotate(45deg)",
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

//Use this to declare the node types
export const shapeNode: Record<string, CustomNodeData> = {
  circle: {
    label: "Circle",
    shape: "circle",
    bgColor: "#e0f7fa",
    textColor: "#006064",
    borderColor: "#006064",
    borderWidth: 2,
    editable: true,
  },
  rounded: {
    label: "Rounded",
    shape: "rounded",
    bgColor: "#fce4ec",
    textColor: "#880e4f",
    borderColor: "#880e4f",
    borderWidth: 2,
    editable: true,
  },
  diamond: {
    label: "Diamond",
    shape: "diamond",
    bgColor: "#fff3e0",
    textColor: "#e65100",
    borderColor: "#e65100",
    borderWidth: 2,
    editable: true,
  },
};

//to convert the node data to default css props
function convertNodeDataToCSS(data: CustomNodeData): React.CSSProperties {
  return {
    backgroundColor: data.bgColor,
    borderColor: data.borderColor,
    borderWidth: data.borderWidth,
    color: data.textColor,
  };
}

//to convert the incoming json to node data
function convertJSONToNode(data: SideBarProps): CustomNodeData {
  const result: CustomNodeData = shapeNode[data.shape];
  result.label = data.name;
  result.bgColor = data.bgColor ? data.bgColor : result.bgColor;
  result.borderColor = data.borderColor ? data.borderColor : result.borderColor;
  result.textColor = data.textColor ? data.textColor : result.textColor;
  result.editable =
    data.editable != undefined ? data.editable : result.editable;
  return result;
}

export const GenericSideBarComponent: React.FC<SideBarProps> = (data) => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    customData: CustomNodeData
  ) => {
    convertJSONToNode(data);
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType, data: customData })
    );
  };

  const nodeData = convertJSONToNode(data);

  const baseStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#e0f7fa",
    color: "#006064",
    border: `2px solid #006064`,
    padding: 10,
    margin: "auto",
    textAlign: "center",
    justifyContent: "center",
    width: 100,
    height: 60,
    ...defaultShapeStyles[data.shape],
    ...convertNodeDataToCSS(nodeData),
  };

  const labelWrapperStyle: React.CSSProperties = {
    transform: data.shape === "diamond" ? "rotate(-45deg)" : undefined,
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        draggable
        style={baseStyle}
        onDragStart={(e) => onDragStart(e, "custom", nodeData)}
      >
        <div style={labelWrapperStyle}>{data.name}</div>
      </div>
    </div>
  );
};
