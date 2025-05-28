import React from "react";
import { GenericSideBarComponent } from "./GenericSidebar";
import { SideBarInputJSON } from "@/types/sidebar";

const Sidebar: React.FC<SideBarInputJSON> = (json) => {
  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        borderRight: "1px solid #ccc",
      }}
    >
      <div
        className="description"
        style={{
          textAlign: "center",
        }}
      >
        Tools
      </div>
      {json.Data.map((object, i) => {
        console.log(object);
        return <GenericSideBarComponent {...object} key={i} />;
      })}
    </aside>
  );
};

export default Sidebar;
