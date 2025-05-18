import { BaseEdge, getBezierPath, getSimpleBezierPath, getSmoothStepPath, getStraightPath, type EdgeProps } from "@xyflow/react";
import type { CustomEdgeType } from "../type";
import React from 'react';


const createCustomEdgeType = (args: CustomEdgeType): React.FC<EdgeProps> => {
  return (props) => {
    let path: string = "";
    
    switch (args.path) {
        case "straight":
            [path] = getStraightPath({sourceX: props.sourceX,sourceY : props.sourceY,targetX:  props.targetX,targetY: props.targetY});
            break;
        case "smooth-step":
            [path] = getSmoothStepPath({sourceX: props.sourceX,sourceY : props.sourceY,targetX:  props.targetX,targetY: props.targetY});
            break
        case "bezier":
            [path] = getBezierPath({sourceX: props.sourceX,sourceY : props.sourceY,targetX:  props.targetX,targetY: props.targetY});
            break
        case "simple-bezier":
            [path] = getSimpleBezierPath({sourceX: props.sourceX,sourceY : props.sourceY,targetX:  props.targetX,targetY: props.targetY});
            break    
    }

    return (
      <>
        <BaseEdge {...props} path={path} label={args.label}/>
      </>
    );
  };
};

export default createCustomEdgeType;

