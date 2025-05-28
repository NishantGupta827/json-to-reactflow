import { SideBarInputJSON } from "./components/sidebar/SideBar";
import { FlowJson } from "./types/flowJson";

export const flowJson: FlowJson = {
  export: true,
  control: true,
  minimap: true,
  background: {
     color: "#000000",
     bgcolor: "#ffffff",
     variant: "cross",
     size: 1,
   },
  nodes: [
    {
      id: "start",
      type: "custom",
      dragHandle: ".drag-handle",
      position: { x: 50, y: 100 },
      data: {
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
        handles: [
          { type: "source", position: "top", id: "start" },
          { type: "target", position: "bottom", id: "in1" },
        ],
      },
    },
    {
      id: "condition",
      type: "custom",
      position: { x: 250, y: 100 },
      data: {
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
        handles: [
          { type: "source", position: "top", id: "out1" },
          { type: "target", position: "bottom", id: "in2" },
        ],
      },
    },
    {
      id: "slack",
      type: "custom",
      position: { x: 450, y: 100 },
      dragHandle: ".drag-handle",
      data: {
        label: "Notify Slack",
        shape: "rounded",
        editable: true,
        handles: [
          { type: "target", position: "left", id: "in3" },
          { type: "source", position: "right", id: "ui8", style: { top: 10 } },
          { type: "target", position: "right", id: "ui7", style: { top: 30 } },
        ],
      },
    },
  ],
  edges: [
    {
      id: "e1",
      source: "start",
      target: "condition",
      animated: true,
      label: "test",
    },
    {
      id: "e3",
      source: "start",
      target: "slack",
      animated: true,
      label: "Continue",
    },
    {
      id: "e2",
      source: "condition",
      target: "slack",
      label: "test2",

      animated: true
    },
  ],
};

export const sidebarJson: SideBarInputJSON = {
  Data: [
    {
      name: "Editable",
      shape: "rounded",
      // bgColor: "#fff3e0",
      editable: true,
    },
    {
      name: "Not Editable",
      shape: "rounded",
      // bgColor: "#e0f7fa",
      editable: false,
    },
    {
      name: "conditional",
      shape: "diamond",
      editable: true,
    },
  ],
};
