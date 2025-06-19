import { Handle, HandleProps, Position } from "@xyflow/react";
import "./ButtonHandle.css";

const wrapperClassMap: Record<Position, string> = {
  [Position.Top]: "handle-wrapper vertical reverse handle-offset-top",
  [Position.Bottom]: "handle-wrapper vertical handle-offset-bottom",
  [Position.Left]: "handle-wrapper horizontal reverse handle-offset-left",
  [Position.Right]: "handle-wrapper horizontal handle-offset-right",
};

export const ButtonHandle = ({
  showButton = true,
  position = Position.Bottom,
  children,
  ...props
}: HandleProps & { showButton?: boolean }) => {
  const wrapperClassName = wrapperClassMap[position || Position.Bottom];
  const vertical = position === Position.Top || position === Position.Bottom;

  return (
    <Handle position={position} id={props.id} {...props}>
      {showButton && (
        <div className={wrapperClassName}>
          <div className={`handle-line ${vertical ? "vertical" : "horizontal"}`} />
          <div className="nodrag nopan">{children}</div>
        </div>
      )}
    </Handle>
  );
};
