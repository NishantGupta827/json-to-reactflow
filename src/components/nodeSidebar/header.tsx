import { Button } from "../ui/button";
import { X } from "lucide-react";

type nodeSideBarHeaderProps = {
  title: string;
  bgColor: string;
  closeSideBar: () => void;
};

export function NodeSideBarHeader({
  title,
  bgColor,
  closeSideBar,
}: nodeSideBarHeaderProps) {
  return (
    <div
      className="py-2 px-3 border-b border-border flex items-center justify-between"
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="text-white">{title}</h3>
      <Button variant="ghost" size="sm" onClick={closeSideBar}>
        <X className="size-4 text-white" />
      </Button>
    </div>
  );
}
