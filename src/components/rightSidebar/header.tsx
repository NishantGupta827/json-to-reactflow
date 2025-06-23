import { Node } from "@xyflow/react";
import * as LucideIcons from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type SideBarProps = {
  icon: string;
  title: string;
  onClose?: React.Dispatch<React.SetStateAction<Node | null>>;
};

export function SideBarHeader({ icon, title, onClose }: SideBarProps) {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as ForwardRefExoticComponent<
    LucideIcons.LucideProps & RefAttributes<SVGSVGElement>
  >;

  // console.log(IconComponent);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {IconComponent ? (
          <div className="p-1.5 bg-blue-100 rounded">
            <IconComponent />
          </div>
        ) : (
          <div className="p-1.5 bg-blue-100 rounded">
            <LucideIcons.Bot />
          </div>
        )}

        <h3 className="font-medium">{title}</h3>
      </div>
      {onClose && (
        <button
          onClick={() => onClose(null)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
        >
          <LucideIcons.X />
        </button>
      )}
    </div>
  );
}
