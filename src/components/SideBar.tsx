import React from "react";
import { GenericSideBarComponent } from "./GenericSidebar";

const Sidebar: React.FC = () => {
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
      <>{GenericSideBarComponent({ shape: "circle", name: "Start" })}</>
      <>{GenericSideBarComponent({ shape: "diamond", name: "Check" })}</>
      <>{GenericSideBarComponent({ shape: "rounded", name: "Notify" })}</>
    </aside>
  );
};

export default Sidebar;
