import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import { type CanvasConfig, type CustomEdgeType, type FlowJson } from '../type';
import { ParseBackground } from './BackGround';
import createCustomEdgeType from './Edges';

export interface BasicFlowProps {
  json: FlowJson;
}

const BasicFlow: React.FC<BasicFlowProps> = ({ json }) => {
  const { nodes, edges, canvas, customEdge } = json;
  const edgeName: CustomEdgeType[] = []
  customEdge.forEach(ele => edgeName.push(ele))

  const edgeMaps = Object.fromEntries(edgeName.map(name => [name.typeName,createCustomEdgeType(name)]))

  console.log(edgeMaps)

  return (
    <>
      <ReactFlowProvider>
        <div style={{ width: '100%', height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeMaps}
            fitView
          >
            <Background {...ParseBackground(canvas as CanvasConfig)}/>
            {canvas?.controls && <Controls />}
            {canvas?.minimap && <MiniMap />}
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default BasicFlow;
