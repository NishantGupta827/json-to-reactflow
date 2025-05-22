import { SideBarInputJSON } from "./components/SideBar";
import type { FlowJson } from "./type";

export const flowJson: FlowJson = {
  export: true,
  canvas: {
    color: '#000000', // color of background dots
    bgcolor: '#ffffff',
    variant: 'cross',
    size: 1,
    controls: true,
    minimap: true
  },
  nodes: [
    {
      id: 'start',
      type: 'custom',
      dragHandle: '.drag-handle',
      position: { x: 50, y: 100 },
      data: {
        label: 'Start',
        labelType: "dropdown",
        labelOptions: ['option1', 'option 2', 'option 3'],
        selectedOption: 'option 2',
        shape: 'circle',
        editable: true,
        handles: [
          { type: 'source', position: 'top', id: 'start' },
          { type: 'target', position: 'bottom', id: 'in1' }
        ]
      }
    },
    {
      id: 'condition',
      type: 'custom',
      position: { x: 250, y: 100 },
      data: {
        label: 'Check',
        shape: 'diamond',
        editable: false,
        handles: [
          { type: 'source', position: 'top', id: 'out1' },
          { type: 'target', position: 'bottom', id: 'in2' }
        ]
      }
    },
    {
      id: 'slack',
      type: 'custom',
      position: { x: 450, y: 100 },
      dragHandle: '.drag-handle',
      data: {
        label: 'Notify Slack',
        shape: 'rounded',
        editable: true,
        handles: [
          { type: 'target', position: 'left', id: 'in3' },
          { type: 'source', position: 'right', id: 'ui8', style: { top: 10 } },
          { type: 'target', position: 'right', id: 'ui7', style: { top: 30 } }
        ]
      }
    }
  ],
  edges: [
    {
      id: 'e1',
      source: 'start',
      target: 'condition',
      animated: true,
      label: 'test'
    },
    {
      id: 'e3',
      source: 'start',
      target: 'slack',
      animated: true,
      label: 'Continue'
    },
    {
      id: 'e2',
      source: 'condition',
      target: 'slack',
      // animated: true
    }
  ],
  customEdge:[
    {
      typeName : "testing",
      path : "bezier",
      label : "test"
    }
  ]
};

export const sidebarJson : SideBarInputJSON = {
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
        editable: true
      }
    ],
  };
