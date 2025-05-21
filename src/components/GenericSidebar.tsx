import { useDnD } from "./DnD";
import type { CustomNodeData } from "./GenericCustomNode";

type SideBarProps = {
  shape: string;
  name: string;
};

const shapeStyles: Record<string, React.CSSProperties> = {
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

export const GenericSideBarComponent: React.FC<SideBarProps> = ({
  shape,
  name,
}) => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    customData: CustomNodeData
  ) => {
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType, data: customData })
    );
  };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#e0f7fa",
    color: "#006064",
    border: `2px solid #006064`,
    padding: 10,
    margin: "10px",
    textAlign: "center",
    width: 100,
    height: 60,
    ...shapeStyles[shape],
  };
  return (
    <div
      draggable
      style={baseStyle}
      onDragStart={(e) => onDragStart(e, "custom", shapeNode[shape])}
    >
      {name}
    </div>
  );
};
