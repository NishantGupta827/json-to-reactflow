import { Node } from "@xyflow/react";
import "./RightSidebar.css";

type SideBarProps = {
  icon: string;
  title: string;
  onClose?: React.Dispatch<React.SetStateAction<Node | null>>;
};

export function SideBarHeader({ title }: SideBarProps) {
  // Helper function to convert kebab-case to PascalCase for Lucide icons

  return (
    // <div className="sidebar-header">
      <div className="ability-title-section">
        <h3 className="ability-title">{title}</h3>
      </div>
    // </div>
  );
}
