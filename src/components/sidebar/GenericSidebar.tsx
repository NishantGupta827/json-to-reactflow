import React from "react";
import { useDnD } from "./DnD";
import { CustomNodeData, shapeStyles } from "@/types/nodes";
import StyledNode from "../node/StyledNode";

//Use this to declare the node types
export const shapeNode: Record<string, CustomNodeData> = {
  circle: {
    label: "Circle",
    shape: "circle",
    bgColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    editable: true,
  },
  rounded: {
    label: "Rounded",
    shape: "rounded",
    bgColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    editable: true,
  },
  diamond: {
    label: "Diamond",
    shape: "diamond",
    bgColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    editable: true,
  },
};

export const GenericSideBarComponent: React.FC<CustomNodeData> = (data) => {
  const [_, setType] = useDnD();

  const {
    bgColor = "#ffffff",
    textColor = "#000000",
    borderColor = "#D3D3D3",
    borderWidth = 0.5,
    shape = "rectangle",
  } = data as CustomNodeData;

  const onDragStart = async (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.persist();
    //convertJSONToNode(data);
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType, data: data })
    );
  };

  //const nodeData = convertJSONToNode(data);

  const isDiamond = shape === "diamond";

  //same as the one used in generic node
  const baseStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: bgColor,
    color: textColor,
    border: `${borderWidth}px solid ${borderColor}`,
    padding: 10,
    textAlign: "center",
    minWidth: isDiamond ? 70 : "110px",
    minHeight: isDiamond ? 70 : "70px",
    width: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    ...shapeStyles[shape],
  };

  return (
    <div
      style={{
        width: "fit-content",
        background: "transparent",
        margin: "10px auto",
      }}
      draggable
      onDragStart={(e) => onDragStart(e, "custom")}
    >
      <div style={baseStyle}>
        <StyledNode id={""} data={data} sidebar={true} />
      </div>
    </div>
  );
};
