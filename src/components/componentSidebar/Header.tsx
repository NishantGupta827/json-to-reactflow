import { ArrowLeftFromLine } from "lucide-react";
import { useEffect, useState } from "react";

type SideBarHeaderProps = {
  onCollapseChange?: (collapsed: boolean) => void;
};

export function SideBarHeader(data: SideBarHeaderProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    data.onCollapseChange?.(isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  const toggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const newState = !prev;
      return newState;
    });
  };
  return (
    <div className="flex">
      <ArrowLeftFromLine
        onClick={() => toggleCollapse()}
        className="cursor-pointer"
      />
      <span style={{ margin: "auto" }}>Components</span>
    </div>
  );
}
