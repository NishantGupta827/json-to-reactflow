import React, { useEffect, useState } from "react";
import { TestJsonType } from "./testingSideBarJson";
import { ArrowLeftFromLine } from "lucide-react";
import { SideBarComponent } from "./langFlowSideBar";
import { useReactFlow } from "@xyflow/react";

type SidebarProps = {
  json: TestJsonType;
  onCollapseChange?: (collapsed: boolean) => void;
};

function SideBarFooter() {
  const { setNodes, getNodes } = useReactFlow();

  const handleAddNode = () => {
    const newNode = {
      id: getNodes().length.toString(),
      type: "custom",
      position: { x: 400, y: 200 },
      data: {
        name: "custom_node",
        display_name: "Custom Component",
        description: "Use as a template to create your own custom component",
        inputs: [
          {
            name: "Input Value",
            label: "Input Value",
            type: "text",
            placeholder: "Hello World!",
            required: false,
            handlePresent: true,
          },
        ],
        outputs: [
          {
            name: "Output",
            type: "text",
            description: "Output description",
          },
        ],
      },
    };

    setNodes((nodes) => [...nodes, newNode]);
  };

  return (
    <div className="w-full p-4 bg-f9f9f9 border-t">
      <button
        className="w-full py-2 rounded hover:bg-gray-300"
        onClick={handleAddNode}
      >
        + Add Component
      </button>
    </div>
  );
}

const Sidebar: React.FC<SidebarProps> = (json) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    json.onCollapseChange?.(true);
  }, [collapsed]);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      return newState;
    });
  };

  function SideBarHeader() {
    return (
      <div className="flex">
        <ArrowLeftFromLine onClick={() => toggleCollapse()} />
        <span style={{ margin: "auto" }}>Components</span>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          width: "250px",
          borderRight: "1px solid #ccc",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
          marginBottom: "50px",
        }}
      >
        <SideBarHeader />
        <div style={{ overflowY: "auto", flex: 1 }}>
          <SideBarComponent data={json.json} />
        </div>
        <SideBarFooter />
      </div>
    </>
  );
};

export default Sidebar;
