import { CSSProperties } from "react";
import ControlAddButton from "./AddButton";
import { UndoRedo } from "./UndoRedo";
import MaximiseButton from "./Maximise";
import { ZoomControl } from "./ZoomControl";
import ClearButton from "./Clear";
import SettingsButton from "./SettingsButton";
import { Minus } from "lucide-react";

type CustomControlProps = {
  undo: () => void;
  redo: () => void;
  onToggleSettings: () => void;
};

function Divider() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        height: "32px",
        transform: "rotate(90deg)",
      }}
    >
      <Minus strokeWidth={1} />
    </div>
  );
}

export function CustomControls({ undo, redo, onToggleSettings }: CustomControlProps) {
  const style: CSSProperties = {
    position: "absolute",
    zIndex: 3000,
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "0.5rem",
    borderRadius: "15px",
    border: "0.3px solid",
    background: "#ffffff",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <div style={style}>
      <ControlAddButton />
      <Divider />
      <UndoRedo undo={undo} redo={redo} />
      <Divider />
      <ClearButton />
      <MaximiseButton />
      <Divider />
      <SettingsButton onToggle={onToggleSettings} />
      <Divider />
      <ZoomControl />
    </div>
  );
}
