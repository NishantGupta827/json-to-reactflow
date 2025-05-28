import { SideBarInputJSON } from "@/types/sidebar";

export const sidebarJson: SideBarInputJSON = {
  Data: [
    {
      label: "Start",
      shape: "circle",
      editable: true,
      inputs: [
        {
          type: "text",
          key: "input1",
          label: "Name",
          value: "Alice",
        },
        {
          type: "dropdown",
          key: "select1",
          label: "Choice",
          value: "option 2",
          options: ["option 1", "option 2", "option 3"],
        },
      ],
    },
    {
      label: "Check",
      shape: "rectangle",
      incoming: 2,
      outgoing: 2,
      editable: true,
      inputs: [
        {
          type: "text",
          key: "input1",
          label: "Name",
          value: "Alice",
        },
        {
          type: "dropdown",
          key: "select1",
          label: "Choice",
          value: "option 2",
          options: ["option 1", "option 2", "option 3"],
        },
      ],
    },
    {
      label: "Notify Slack",
      shape: "rounded",
      editable: true,
    },
  ],
};
