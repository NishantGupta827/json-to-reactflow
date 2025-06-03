import React, { useEffect, useState } from "react";
import { SideBarComponent } from "./Component";
import { SideBarFooter } from "./Footer";
import { SideBarHeader } from "./Header";
import { SideBarJson } from "@/types/sidebar";

type SidebarProps = {
  json: SideBarJson;
  onCollapseChange?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = (json) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    json.onCollapseChange?.(true);
  }, [isSidebarCollapsed]);

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
        <SideBarHeader
          onCollapseChange={(collapsed: boolean) =>
            setIsSidebarCollapsed(collapsed)
          }
        />
        <div style={{ overflowY: "auto", flex: 1 }}>
          <SideBarComponent data={json.json} />
        </div>
        <SideBarFooter />
      </div>
    </>
  );
};

export default Sidebar;
