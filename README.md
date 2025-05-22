# json-to-reactflow

Convert deeply nested JSON into a customizable, interactive diagram using [React Flow](https://reactflow.dev/).

![npm](https://img.shields.io/npm/v/json-to-reactflow)  
📦 Lightweight | ⚙️ Customizable | ⚡ Powered by React Flow

---

## 🚀 Installation

```bash
npm install json-to-reactflow
````

---

## 🧩 Usage

```tsx
import { JsonToReactFlow, type BasicFlowProps } from 'json-to-reactflow';
import '@xyflow/react/dist/style.css';

const json: BasicFlowProps = {
  nodes: [/* ... */],
  edges: [/* ... */],
  customEdge: [/* optional custom edge data */],
};

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <JsonToReactFlow json={json} />
    </div>
  );
}
```

---

## 📘 Props

### `BasicFlowProps`

| Prop   | Type       | Description                                                  |
| ------ | ---------- | ------------------------------------------------------------ |
| `json` | `FlowJson` | The JSON object containing nodes, edges, and optional config |

---

### `FlowJson` structure

```ts
interface FlowJson {
  export?: boolean;
  nodes: Node[];
  edges: Edge[];
  customEdge: CustomEdgeType[];
  canvas?: CanvasConfig;
}
```

---

## 🧪 Sample JSON

```ts
export const flowJson: FlowJson = {
  export: true,
  canvas: {
    color: '#000000',
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
      target: 'slack'
    }
  ]
};
```

### Sidebar JSON Example

```ts
export const sidebarJson: SideBarInputJSON = {
  Data: [
    {
      name: "Editable",
      shape: "rounded",
      editable: true
    },
    {
      name: "Not Editable",
      shape: "rounded",
      editable: false
    },
    {
      name: "conditional",
      shape: "diamond",
      editable: true
    }
  ]
};
```

---

## 🛠 Customization

You can enhance behavior by modifying:

* `labelType` for custom node labels (text, dropdown, radio)
* `canvas` for background and grid styling
* Add your own sidebars, panels, or features with minimal changes

---

## 📄 License

MIT

```

---

Let me know if you'd like:
- JSON schema auto-validation section
- A CodeSandbox template link
- A visual diagram in the README

I'm happy to help package it for full open-source visibility!
```
