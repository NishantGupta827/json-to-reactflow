import { Node } from "@xyflow/react";
import * as LucideIcons from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import "./RightSidebar.css";

type SideBarProps = {
  icon: string;
  title: string;
  onClose?: React.Dispatch<React.SetStateAction<Node | null>>;
};

export function SideBarHeader({ icon, title, onClose }: SideBarProps) {
  // Helper function to convert kebab-case to PascalCase for Lucide icons
  const convertIconName = (iconName: string): string => {
    return iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  // Convert icon name and get the component
  const convertedIconName = convertIconName(icon);
  const IconComponent = LucideIcons[
    convertedIconName as keyof typeof LucideIcons
  ] as ForwardRefExoticComponent<
    LucideIcons.LucideProps & RefAttributes<SVGSVGElement>
  >;

  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <div className="sidebar-icon-wrapper">
          {IconComponent ? <IconComponent /> : <LucideIcons.Bot />}
        </div>
        <h3 className="sidebar-title">{title}</h3>
      </div>
      {onClose && (
        <button className="sidebar-close-btn" onClick={() => onClose(null)}>
          <LucideIcons.X />
        </button>
      )}
    </div>
  );
}
