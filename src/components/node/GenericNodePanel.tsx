import React, { useState, useEffect } from 'react';
import { type Node, Panel } from '@xyflow/react';

interface NodeDetailsPanelProps {
  node: Node;
  onClose: () => void;
  onUpdateNode: (updatedNode: Node) => void;
}

const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({ node, onClose, onUpdateNode }) => {
  const [position, setPosition] = useState(node.position);
  const [data, setData] = useState<Record<string, any>>(node.data || {});

  useEffect(() => {
    setPosition(node.position);
    setData(node.data || {});
  }, [node]);

  const handleSave = () => {
    onUpdateNode({
      ...node,
      position,
      data,
    });
  };

  return (
    <Panel position="top-right">
      <div style={{
        padding: '1rem',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>Node Details</h4>
          <button onClick={onClose} style={{ cursor: 'pointer' }}>✕</button>
        </div>
        <hr />

        <p><strong>ID:</strong> {node.id}</p>
        <p><strong>Type:</strong> {node.type}</p>

        <div>
          <label><strong>Position X:</strong></label>
          <input
            type="number"
            value={position.x}
            onChange={(e) => setPosition(p => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <label><strong>Position Y:</strong></label>
          <input
            type="number"
            value={position.y}
            onChange={(e) => setPosition(p => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>

        <div>
          <strong>Data:</strong>
          {Object.entries(data).map(([key, val]) => (
            <div key={key} style={{ marginBottom: '0.5rem' }}>
              <label>{key}</label>
              <input
                type="text"
                value={val as unknown as string}
                onChange={(e) => setData(d => ({ ...d, [key]: e.target.value }))}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button onClick={handleSave} style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            Save
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default NodeDetailsPanel;
