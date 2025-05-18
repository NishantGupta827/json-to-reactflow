import { BackgroundVariant } from "@xyflow/react";

export const flowJson = {
  canvas: {
    color: '#000000', //changes the color of dots
    bgcolor: '#ffffff',
    variant: BackgroundVariant.Cross,
    size:1,
    controls: true,
    minimap: true
  },
  nodes: [
    {
      id: 'start',
      type: 'input',
      position: { x: 50, y: 100 },
      shape: 'circle',
      data: { label: 'Start' }
    },
    {
      id: 'condition',
      type: 'default',
      position: { x: 250, y: 100 },
      shape: 'diamond',
      data: { label: 'Check' }
    },
    {
      id: 'slack',
      type: 'output',
      position: { x: 450, y: 100 },
      shape: 'rectangle',
      data: { label: 'Notify Slack' }
    }
  ],
  edges: [
    {
      id: 'e1',
      source: 'start',
      target: 'condition'
    },
    {
      id: 'e2',
      source: 'condition',
      target: 'slack'
    }
  ]
};