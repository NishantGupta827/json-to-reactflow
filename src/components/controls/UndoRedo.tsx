import { RedoIcon, UndoIcon } from "lucide-react";

type undoRedoProps = {
  undo: () => void;
  redo: () => void;
};

export function UndoRedo({ undo, redo }: undoRedoProps) {
  return (
    <>
      <div onClick={undo}>
        <UndoIcon />
      </div>
      <div onClick={redo}>
        <RedoIcon />
      </div>
    </>
  );
}
