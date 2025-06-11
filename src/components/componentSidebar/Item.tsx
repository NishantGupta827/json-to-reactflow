import { Item } from "@/types/sidebar";
import { useDnD } from "./DnD";
import { Bot } from "lucide-react";

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
      className="box-border flex flex-row gap-2 items-start justify-start p-2 relative overflow-hidden"
      onDragStart={onDragStart}
      draggable={true}
    >
      <div className="shrink-0">
        <Bot />
      </div>
      <div className="relative w-0 flex-1">
        <div className="box-border flex flex-col items-start justify-start leading-[0] not-italic p-0 relative text-left">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#475161] text-[14px] w-full">
            <p className="block leading-[1.5]">{data.title}</p>
          </div>
          <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#6e6b86] text-[12px] tracking-[0.24px] w-full">
            <p className="block leading-[1.5]">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
