import React from 'react';
import type { CustomNodeData } from './GenericCustomNode';
import { useDnD } from './DnD';
import { GenericSideBarComponent } from './GenericSidebar';

const Sidebar: React.FC = () => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    customData: CustomNodeData
  ) => {
    console.log('DRAG START', { nodeType, customData });
    setType?.("custom");
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ type: nodeType, data: customData })
    );
  };

  return (
    <aside
        style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f9f9f9',
        borderRight: '1px solid #ccc',
      }}
    >
      <div className="description">Tools</div>

      <div
        className="dndnode"
        style={{
            height: "100px",
            padding: "4px",
            borderRadius: "2px", 
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "grab",
        }}
        draggable
        onDragStart={(e) =>
          onDragStart(e, 'custom', {
            label: 'Start',
            shape: 'circle',
            bgColor: '#e0f7fa',
            textColor: '#006064',
            borderColor: '#006064',
            borderWidth: 2,
            editable: true,
          })
        }
      >
        <>{GenericSideBarComponent({ shape: 'circle', name: 'Start' })}</>
      </div>

      <div
        className="dndnode"
        style={{
            height: "100px",
            padding: "4px",
            borderRadius: "2px", 
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "grab",
        }}
        draggable
        onDragStart={(e) =>
          onDragStart(e, 'custom', {
            label: 'Check',
            shape: 'diamond',
            bgColor: '#fff3e0',
            textColor: '#e65100',
            borderColor: '#e65100',
            borderWidth: 2,
            editable: true,
          })
        }
      >
        <>
        {GenericSideBarComponent({ shape: 'diamond', name: 'Check' })}
        </>
      </div>

      <div
        className="dndnode"
        style={{
            height: "100px",
            padding: "4px",
            borderRadius: "2px", 
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "grab",
        }}
        draggable
        onDragStart={(e) =>
          onDragStart(e, 'custom', {
            label: 'Notify Slack',
            shape: 'rounded',
            bgColor: '#fce4ec',
            textColor: '#880e4f',
            borderColor: '#880e4f',
            borderWidth: 2,
            editable: true,
          })
        }
      >
        <>
        {GenericSideBarComponent({ shape: 'rounded', name: 'Notify' })}
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
