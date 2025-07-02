import { useReactFlow } from "@xyflow/react";
import { ZoomIn, ZoomOut } from "lucide-react";

export function ZoomControl() {
  const { zoomIn, zoomOut } = useReactFlow();

  return (
    <>
      <div onClick={() => zoomIn({ duration: 500 })}>
        <ZoomIn />
      </div>
      <div onClick={() => zoomOut({ duration: 500 })}>
        <ZoomOut />
      </div>
    </>
  );
}
