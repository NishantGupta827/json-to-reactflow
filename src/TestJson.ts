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
      position: { x: 50, y: 100 },
      data: {
        label: 'Start',
        shape: 'circle',
        bgColor: '#e0f7fa',
        textColor: '#006064',
        borderColor: '#006064',
        borderWidth: 2,
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
        bgColor: '#fff3e0',
        textColor: '#e65100',
        borderColor: '#e65100',
        borderWidth: 2,
        editable: true,
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
      data: {
        label: 'Notify Slack',
        shape: 'rounded',
        bgColor: '#fce4ec',
        textColor: '#880e4f',
        borderColor: '#880e4f',
        borderWidth: 2,
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
      type:"testing",
      sourceHandle: 'start',
      reconnectable: true,
      label:'edges',
      target: 'condition',
      targetHandle: 'in2'
    },
    {
      id: 'e2',
      source: 'condition',
      sourceHandle: 'out1',
      target: 'slack',
      targetHandle: 'in3'
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
