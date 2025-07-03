import { useReactFlow, useStore } from "@xyflow/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useEffect } from "react";

export function ZoomControl() {
  const { zoomIn, zoomOut } = useReactFlow();
  const zoomSelector = (s: { transform: any[] }) => s.transform[2];
  const showContent = useStore(zoomSelector);

  useEffect(() => {
    console.log("new zoom is : ", showContent);
  }, [showContent]);

  return (
    <>
      <div
        onClick={() => zoomIn({ duration: 500 })}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
        }}
      >
        <ZoomIn strokeWidth={1} />
      </div>
      <div
        onClick={() => zoomOut({ duration: 500 })}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
        }}
      >
        <ZoomOut strokeWidth={1} />
      </div>
    </>
  );
}
