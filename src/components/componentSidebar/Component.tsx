import React from "react";
import { SideBarJson } from "@/types/sidebar";
import SideBarItemComponent from "./Item";

type SideBarComponentProps = {
  data: SideBarJson;
};

export const SideBarComponent: React.FC<SideBarComponentProps> = ({ data }) => {
  return (
    <div className="sidebar p-4">
      {data.folders.map((folder, folderIdx) => {
        const items = folder.item.map((ele, idx) => (
          <SideBarItemComponent key={idx} data={ele} />
        ));
        return (
          <>
            <div
              className="text-sm font-medium mb-1"
              key={`${folderIdx}_folder`}
            >
              {folder.folderName}
            </div>
            {items}
          </>
        );
      })}
    </div>
  );
};
