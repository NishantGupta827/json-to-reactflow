import { RedoIcon, UndoIcon } from "lucide-react";

type undoRedoProps = {
  undo: () => void;
  redo: () => void;
};

export function UndoRedo({ undo, redo }: undoRedoProps) {
  return (
    <>
      <div
        onClick={undo}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
        }}
      >
        <UndoIcon strokeWidth={1} />
      </div>
      <div
        onClick={redo}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
        }}
      >
        <RedoIcon strokeWidth={1} />
      </div>
    </>
  );
}
