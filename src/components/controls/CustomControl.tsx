import { CSSProperties } from "react";
import ControlAddButton from "./AddButton";
import { Redo, Undo } from "./UndoRedo";
import MaximiseButton from "./Maximise";
import { ZoomInButton, ZoomOutButton } from "./ZoomControl";
import ClearButton from "./Clear";

export function CustomControls() {
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
      <Undo />
      <Redo />
      <ClearButton />
      <MaximiseButton />
      <ZoomInButton />
      <ZoomOutButton />
    </div>
  );
}
