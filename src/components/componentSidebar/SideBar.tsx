import React, { useState } from "react";
import { SideBarComponent } from "./Component";
import { SideBarJson } from "@/types/sidebar";
import { Search } from "lucide-react";

type SidebarProps = {
  json: SideBarJson;
  onCollapseChange?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = (json) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  let componentTabs = ["All"];
  json.json.folders.forEach((ele) => componentTabs.push(ele.folderName));

  const getComponentList = () => {
    let new_props: SideBarJson = {
      folders: [],
    };
    let intermediate: SideBarJson = {
      folders: [],
    };
    if (activeTab.toLowerCase() == "all") {
      intermediate = json.json;
    } else {
      intermediate.folders = json.json.folders.filter(
        (ele) => ele.folderName.toLowerCase() === activeTab.toLowerCase()
      );
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      intermediate.folders.forEach((ele) => {
        const new_items = ele.item.filter((e) =>
          e.title.toLowerCase().includes(query)
        );
        if (new_items.length != 0) {
          new_props.folders.push({
            folderName: ele.folderName,
            item: new_items,
          });
        }
      });
    } else {
      new_props = intermediate;
    }

    return new_props;
  };

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
          backgroundColor: "#ffffff",
          marginBottom: "50px",
        }}
      >
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-8 pr-2 py-1.5 rounded-md border border-border bg-input-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex border-b border-border mb-2">
          {componentTabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-1 px-1 text-sm ${
                activeTab.toLowerCase() === tab.toLowerCase()
                  ? "border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          <SideBarComponent data={getComponentList()} />
        </div>
        {/* <SideBarFooter /> */}
      </div>
    </>
  );
};

export default Sidebar;
