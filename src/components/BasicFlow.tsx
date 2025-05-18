import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import { type FlowJson } from '../type';

interface BasicFlowProps {
  json: FlowJson;
}

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { nodes, edges, canvas } = json;

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          {canvas?.background && <Background color={canvas.background} gap={16} />}
          {canvas?.controls && <Controls />}
          {canvas?.minimap && <MiniMap />}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default BasicFlow;
