type SideBarProps = {
    shape : string
    name : string
}

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

export const GenericSideBarComponent :React.FC<SideBarProps> = ({shape,name}) => {
    const baseStyle: React.CSSProperties = {
        position: 'relative',
        backgroundColor: "#e0f7fa",
        color: "#006064",
        border: `2px solid #006064`,
        padding: 10,
        textAlign: 'center',
        width: 100,
        height: 60,
        ...shapeStyles[shape],
    };
    return (
    <div draggable style = {baseStyle}>{name}</div>
  )
}
