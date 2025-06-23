import { Icons } from "@/assets/Icon";
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

type SideBarProps = {
  icon: string;
  title: string;
};

export function SideBarHeader({ icon, title }: SideBarProps) {
  console.log(icon, title);
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 rounded">{Icons[icon]}</div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
        <X />
      </button>
    </div>
  );
}
