import { CSSProperties } from "react";
import ControlAddButton from "./AddButton";
import { UndoRedo } from "./UndoRedo";
import MaximiseButton from "./Maximise";
import { ZoomControl } from "./ZoomControl";
import ClearButton from "./Clear";

type CustomControlProps = {
  undo: () => void;
  redo: () => void;
};

export function CustomControls({ undo, redo }: CustomControlProps) {
  const style: CSSProperties = {
    position: "absolute",
    zIndex: 10,
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "0.5rem",
    borderRadius: "20px",
    border: "1px solid",
    background: "#ffffff",
    padding: "10px",
  };

  return (
    <div style={style}>
      <ControlAddButton />
      <UndoRedo undo={undo} redo={redo} />
      <ClearButton />
      <MaximiseButton />
      <ZoomControl />
    </div>
  );
}
