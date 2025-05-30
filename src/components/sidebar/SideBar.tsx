import React, { useEffect, useState } from "react";
import { TestJsonType } from "./testingSideBarJson";
import { ArrowLeftFromLine } from "lucide-react";
import { SideBarComponent } from "./langFlowSideBar";

type SidebarProps = {
  json: TestJsonType;
  onCollapseChange?: (collapsed: boolean) => void;
};

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
        }}
      >
        <SideBarHeader />
        <SideBarComponent data={json.json} />
      </div>
    </>
  );
};

export default Sidebar;
