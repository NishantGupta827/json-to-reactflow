import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSimpleBezierPath, getSmoothStepPath, getStraightPath, useEdges, type EdgeProps } from "@xyflow/react";
import type { CustomEdgeType } from "../type";
import React, { useMemo, type CSSProperties, type ReactNode } from 'react';

export const EdgePathType = {
  Straight: 'straight',
  SmoothStep: 'smooth-step',
  Bezier: 'bezier',
  SimpleBezier: 'simple-bezier',
  StepEdge: 'step-edge',
} as const;

export type EdgePathType = (typeof EdgePathType)[keyof typeof EdgePathType];

const getCenterStyleProps = (labelX: number, labelY: number, labelStyle: CSSProperties) => ({
  style: {
    position: 'absolute' as const,
    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
    pointerEvents: 'all' as const,
    zIndex: 1,
    background: 'white',
    padding: '2px 4px',
    borderRadius: '4px',
    ...labelStyle
  },
  className: 'nodrag nopan',
});

const Textbox: React.FC<{labelx: number, labely: number,labelStyle:CSSProperties, label:ReactNode}> = ({labelx,labely,labelStyle,label}) => {
    const {style,className} = getCenterStyleProps(labelx,labely,labelStyle)
    return (
        <div style={style} className={className}>
            {label}
        </div>
    )
}

const createCustomEdgeType = (args: CustomEdgeType): React.FC<EdgeProps> => {
  return (props) => {

    const { selectable,deletable,sourceX,sourcePosition,sourceY,targetHandleId,sourceHandleId,targetPosition,pathOptions, ...safeProps } = props; //just getting rid of unsafe values(was throwing error in console)

    let path:string = "",labelx:number=0,labely: number=0;

    const edges = useEdges()
    const label = useMemo(() => {
        return edges.find(edge => edge.id === props.id)?.label;
    }, [edges, props.id]);
    const labelStyle = args?.labelStyle as CSSProperties
    
    switch (args.path) {
        case EdgePathType.Straight:
            [path,labelx,labely] = getStraightPath({sourceX: sourceX,sourceY : sourceY,targetX:  props.targetX,targetY: props.targetY});
            break;

        case EdgePathType.SmoothStep:
            [path,labelx,labely] = getSmoothStepPath({sourceX: sourceX,sourceY : sourceY,targetX:  props.targetX,targetY: props.targetY, sourcePosition: sourcePosition,targetPosition:targetPosition});
            break
        case EdgePathType.Bezier:
            [path,labelx,labely] = getBezierPath({sourceX: sourceX,sourceY : sourceY,targetX:  props.targetX,targetY: props.targetY, sourcePosition:sourcePosition, targetPosition:targetPosition});
            break
        case EdgePathType.SimpleBezier:
            [path,labelx,labely] = getSimpleBezierPath({sourceX: sourceX,sourceY : sourceY,targetX:  props.targetX,targetY: props.targetY, sourcePosition:sourcePosition,targetPosition:targetPosition});
            break
        case EdgePathType.StepEdge:
            if (sourcePosition === 'left' || sourcePosition === 'right') {
                const centerX = (props.targetX - sourceX) / 2 + sourceX;
                path = `M ${sourceX} ${sourceY} L ${centerX} ${sourceY} L ${centerX} ${props.targetY} L ${props.targetX} ${props.targetY}`;
                labelx = centerX;
                labely = (sourceY + props.targetY) / 2;
            } else {
                const centerY = (props.targetY - sourceY) / 2 + sourceY;
                path = `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${props.targetX} ${centerY} L ${props.targetX} ${props.targetY}`;
                labelx = (sourceX + props.targetX) / 2;
                labely = centerY;
            }
    }

    return (
      <>
        <BaseEdge {...safeProps} path={path} style={{zIndex: 10,position: 'relative'}} />
        <EdgeLabelRenderer>
            <>{Textbox({labelx,labely,labelStyle,label})}</>
        </EdgeLabelRenderer>
      </>
    );
  };
};

export default createCustomEdgeType;

