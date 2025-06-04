import { Item } from "@/types/sidebar";
import { useDnD } from "./DnD";

type ItemProps = {
  data: Item;
};

export default function SideBarItemComponent({ data }: ItemProps) {
  const [_, setType] = useDnD();

  const onDragStart = async (event: React.DragEvent<HTMLElement>) => {
    console.log(data.attributes);
    event.persist();
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: "custom", data: data.nodeData })
    );

    const dragPreview = document.createElement("div");

    dragPreview.innerText = data.title;

    Object.assign(dragPreview.style, {
      border: "2px #60a5fa",
      borderRadius: "0.5rem",
      padding: "0.25rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      whiteSpace: "nowrap",
      display: "inline-block",
      backgroundColor: "#ffffff",
      pointerEvents: "none",
      boxShadow: "0 0 0 1px rgba(96,165,250,0.25)",
    });

    document.body.appendChild(dragPreview);
    event.dataTransfer.setDragImage(dragPreview, 0, 0);

    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);
  };

  return (
    <div
      className="p-2 mb-1 hover:bg-muted rounded-md cursor-grab active:cursor-grabbing"
      onDragStart={onDragStart}
      draggable={true}
    >
      <div className="flex items-start mb-1">
        <div className="mr-2 mt-0.5">{data.icon}</div>
        <div>
          <div className="text-sm">{data.title}</div>
          <div className="text-xs text-muted-foreground">
            {data.description}
          </div>
        </div>
      </div>
      {data.attributes && (
        <div className="ml-6 mt-1 text-xs bg-gray-50 p-1.5 rounded border border-gray-100">
          {data.attributes.map((data, id) => (
            <div
              className="flex items-center justify-between mb-0.5"
              key={`${data}-${id}`}
            >
              <span key={`${id}_1`} className="text-muted-foreground">
                {data[0]}
              </span>
              <span key={`${id}_2`} className="font-medium">
                {data[1]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
