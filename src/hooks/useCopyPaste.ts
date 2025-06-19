import { ReactFlowInstance, Node } from "@xyflow/react";
import { useCallback, useEffect } from "react";

export const useCopyPaste = (
  rfInstance: ReactFlowInstance | null,
  takeSnapshot: () => void
) => {
  const onCopyCapture = useCallback(
    (event: ClipboardEvent) => {
      event.preventDefault();
      const nodes = JSON.stringify(
        rfInstance?.getNodes().filter((n) => n.selected)
      );
      event.clipboardData?.setData("flowchart:nodes", nodes);
    },
    [rfInstance]
  );

  const onPasteCapture = useCallback(
    (event: ClipboardEvent) => {
      event.preventDefault();
      const nodes = JSON.parse(
        event.clipboardData?.getData("flowchart:nodes") || "[]"
      ) as Node[] | undefined;

      if (nodes?.length) {
        const randomId = () => Math.random().toString(16).slice(2);
        rfInstance?.setNodes((prev) => {
          const updated = [
            ...prev.map((n) => ({ ...n, selected: false })),
            ...nodes.map((n) => ({
              ...n,
              selected: true,
              id: randomId(),
              position: { x: n.position.x + 10, y: n.position.y + 10 },
            })),
          ];
          takeSnapshot();
          return updated;
        });
      }
    },
    [rfInstance, takeSnapshot]
  );

  useEffect(() => {
    window.addEventListener("copy", onCopyCapture);
    return () => window.removeEventListener("copy", onCopyCapture);
  }, [onCopyCapture]);

  useEffect(() => {
    window.addEventListener("paste", onPasteCapture);
    return () => window.removeEventListener("paste", onPasteCapture);
  }, [onPasteCapture]);
};
