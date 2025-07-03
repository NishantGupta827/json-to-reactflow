import { RedoIcon, UndoIcon } from "lucide-react";
import { useState } from "react";

type undoRedoProps = {
  undo: () => void;
  redo: () => void;
};

export function UndoRedo({ undo, redo }: undoRedoProps) {
  const [hoveredUndo, setHoveredUndo] = useState(false);
  const [hoveredRedo, setHoveredRedo] = useState(false);

  return (
    <>
      <div
        onClick={undo}
        onMouseEnter={() => setHoveredUndo(true)}
        onMouseLeave={() => setHoveredUndo(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          backgroundColor: hoveredUndo ? "#f3f4f6" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        <UndoIcon strokeWidth={1} />
      </div>
      <div
        onClick={redo}
        onMouseEnter={() => setHoveredRedo(true)}
        onMouseLeave={() => setHoveredRedo(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          backgroundColor: hoveredRedo ? "#f3f4f6" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        <RedoIcon strokeWidth={1} />
      </div>
    </>
  );
}
