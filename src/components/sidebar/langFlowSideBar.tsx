import React, { JSX, useEffect, useRef, useState } from "react";
import { Item, TestJsonType } from "./testingSideBarJson";
import { useDnD } from "./DnD";
import "@contentstack/venus-components/build/main.css";
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

type SideBarComponentProps = {
  data: TestJsonType;
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
  dragIcon: <GripVertical />,
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

function Button({ leftIcon, label, rightIcon, ...rest }: ButtonProps) {
  return (
    <button
      className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-100 transition-all duration-200"
      {...rest}
    >
      {icons[leftIcon]}
      <span style={{ margin: "auto" }}>{label}</span>
      {icons[rightIcon]}
    </button>
  );
}

function SideBarDropdown({ label, icon, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(
        isOpen ? `${contentRef.current.scrollHeight + 10}px` : "0px"
      );
    }
  }, [isOpen, children]);

  return (
    <div className="w-full bg-transparent">
      <button
        className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-300"
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
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition:
            "max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease",
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? "0.5rem" : "0",
          paddingBottom: isOpen ? "0.5rem" : "0",
        }}
      >
        <div className="ml-4 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

export const SideBarComponent: React.FC<SideBarComponentProps> = ({ data }) => {
  console.log(data);
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
    <Button
      leftIcon={data.icon}
      label={data.label}
      rightIcon={"dragIcon"}
      draggable={true}
      onDragStart={onDragStart}
    />
  );
}
