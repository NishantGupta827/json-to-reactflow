import React from "react";
import { useDnD } from "../DnD";
import type { CustomNodeData } from "./GenericCustomNode";
import html2canvas from "html2canvas";

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

function cropCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx?.getImageData(0, 0, width, height);
  if (!imageData) return canvas;

  let top = null,
    bottom = null,
    left = null,
    right = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = imageData.data[(y * width + x) * 4 + 3];
      if (alpha !== 0) {
        if (top === null) top = y;
        bottom = y;
        if (left === null || x < left) left = x;
        if (right === null || x > right) right = x;
      }
    }
  }

  if (top === null || bottom === null || left === null || right === null) {
    // canvas is fully transparent
    return canvas;
  }

  const croppedWidth = right - left + 1;
  const croppedHeight = bottom - top + 1;

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = croppedWidth;
  croppedCanvas.height = croppedHeight;

  const croppedCtx = croppedCanvas.getContext("2d");
  if (!croppedCtx) return canvas;

  const imgData: ImageData = ctx?.getImageData(
    left,
    top,
    croppedWidth,
    croppedHeight
  ) as ImageData;

  croppedCtx.putImageData(imgData, 0, 0);

  return croppedCanvas;
}

export const GenericSideBarComponent: React.FC<SideBarProps> = (data) => {
  const [_, setType] = useDnD();

  const onDragStart = async (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    customData: CustomNodeData
  ) => {
    event.persist();
    convertJSONToNode(data);
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType, data: customData })
    );
  };

  const nodeData = convertJSONToNode(data);

  const isDiamond = data.shape === "diamond";

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f7fa",
    color: "#006064",
    border: `2px solid #006064`,
    padding: 10,
    margin: "auto",
    textAlign: "center",
    width: isDiamond ? "70px" : "110px",
    height: isDiamond ? "70px" : "70px",
    marginTop: isDiamond ? "15px" : "0px",
    overflow: "visible",
    ...defaultShapeStyles[data.shape],
    ...convertNodeDataToCSS(nodeData),
  };

  const labelWrapperStyle: React.CSSProperties = {
    transform: data.shape === "diamond" ? "rotate(-45deg)" : undefined,
  };

  return (
    <div
      style={{
        width: "fit-content",
        background: "transparent",
        margin: "10px auto",
      }}
      draggable
      onDragStart={(e) => onDragStart(e, "custom", nodeData)}
    >
      <div style={baseStyle}>
        <div style={labelWrapperStyle}>{data.name}</div>
      </div>
    </div>
  );
};
