import { Button } from "../ui/button";
import { ArrowRight, X } from "lucide-react";

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

type edgeSideBarProps = {
  closeSideBar: () => void;
};

export function EdgeSideBarHeader({ closeSideBar }: edgeSideBarProps) {
  return (
    <div className="py-3 px-4 border-b border-border flex items-center justify-between bg-gray-50">
      <div className="flex items-center gap-2">
        <div className="text-gray-600">
          <ArrowRight />
        </div>
        <h3 className="text-gray-900 font-medium">Workflow Connection</h3>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-500 hover:bg-gray-200"
        onClick={closeSideBar}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
