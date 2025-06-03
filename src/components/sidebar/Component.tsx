import React, { JSX } from "react";
import { useDnD } from "./DnD";
import {
  Bot,
  ChevronRight,
  Download,
  GitBranch,
  GripVertical,
  MessageCircle,
  Route,
  Text,
  Upload,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { Item, SideBarJson } from "@/types/sidebar";

type SideBarComponentProps = {
  data: SideBarJson;
};

type SideBarItemProps = {
  data: Item;
};

type DropdownProps = {
  label: string;
  children: JSX.Element[];
  icon: string;
};

type Icons = {
  [key: string]: React.ReactElement;
};

const icons: Icons = {
  input: <Download />,
  output: <Upload />,
  chat: <MessageCircle />,
  dragIcon: <GripVertical className="cursor-grab" />,
  text: <Text />,
  agent: <Bot />,
  routing: <Route />,
  conditional: <GitBranch />,
};

type ButtonProps = {
  leftIcon: string;
  label: string;
  rightIcon: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function CustomButton({
  leftIcon,
  label,
  rightIcon,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`mt-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-100 transition-all duration-200 ${className}`}
      {...rest}
    >
      {icons[leftIcon]}
      <span style={{ margin: "auto" }}>{label}</span>
      {icons[rightIcon]}
    </button>
  );
}

function SideBarDropdown({ label, icon, children }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 m-auto w-full">
        <CollapsibleTrigger asChild>
          <Button
            className="text-black bg-[#f9f9f9] w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {icons[icon]}
            <span style={{ textAlign: "left" }}>{label}</span>
            <div
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            >
              <ChevronRight />
            </div>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2 p-[5px]">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export const SideBarComponent: React.FC<SideBarComponentProps> = ({ data }) => {
  return (
    <div className="sidebar p-4">
      {data.folders.map((folder, folderIdx) => {
        const items = folder.item.map((ele, idx) => (
          <SideBarItem key={idx} data={ele} />
        ));
        return (
          <SideBarDropdown
            key={folderIdx}
            icon={folder.icon}
            label={folder.folderName}
          >
            {items}
          </SideBarDropdown>
        );
      })}
    </div>
  );
};

function SideBarItem({ data }: SideBarItemProps) {
  const [_, setType] = useDnD();

  const onDragStart = async (event: React.DragEvent<HTMLElement>) => {
    event.persist();
    setType?.("custom");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: "custom", data: data.data })
    );
  };

  return (
    <CustomButton
      leftIcon={data.icon}
      label={data.label}
      rightIcon={"dragIcon"}
      draggable={true}
      onDragStart={onDragStart}
    />
  );
}
