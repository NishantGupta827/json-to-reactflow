import React, { useCallback } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

const positionMap: Record<'top' | 'bottom' | 'left' | 'right', Position> = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

const shapeStyles: Record<string, React.CSSProperties> = {
  rectangle: {},
  circle: { borderRadius: '50%' },
  rounded: { borderRadius: '12px' },
  diamond: {
    transform: 'rotate(45deg)',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

type HandleConfig = {
  id: string;
  type: 'source' | 'target';
  position: keyof typeof positionMap;
  style?: React.CSSProperties;
};

export type CustomNodeData = {
  label?: string;
  shape?: keyof typeof shapeStyles;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  handles?: HandleConfig[];
  editable?: boolean;
};

const GenericCustomNode: React.FC<NodeProps> = ({ data }) => {
  const {
    label = '',
    bgColor = '#ffffff',
    textColor = '#000000',
    borderColor = '#000000',
    borderWidth = 1,
    shape = 'rectangle',
    handles = [],
    editable = false,
  } = data as CustomNodeData;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Updated label:', e.target.value);
  }, []);

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: bgColor,
    color: textColor,
    border: `${borderWidth}px solid ${borderColor}`,
    padding: 10,
    textAlign: 'center',
    width: 100,
    height: 60,
    ...shapeStyles[shape],
  };

  const labelWrapperStyle: React.CSSProperties = {
    transform: shape === 'diamond' ? 'rotate(-45deg)' : undefined,
  };

  return (
    <div style={baseStyle}>
      <div style={labelWrapperStyle}>
        {editable ? (
          <input
            type="text"
            defaultValue={label}
            onChange={onChange}
            className="nodrag"
            style={{
              width: '90%',
              textAlign: 'center',
              background: 'transparent',
              color: textColor,
              border: 'none',
            }}
          />
        ) : (
          label
        )}
      </div>

      {handles.map((handle: HandleConfig) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={positionMap[handle.position]}
          style={handle.style ?? { background: '#555' }}
        />
      ))}
    </div>
  );
};

export default GenericCustomNode;
