import { useReactFlow } from "@xyflow/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

export function ZoomControl() {
  const { zoomIn, zoomOut } = useReactFlow();
  const [hoveredZoomIn, setHoveredZoomIn] = useState(false);
  const [hoveredZoomOut, setHoveredZoomOut] = useState(false);
  // const zoomSelector = (s: { transform: any[] }) => s.transform[2];
  // const showContent = useStore(zoomSelector);

  // useEffect(() => {
  //   console.log("new zoom is : ", showContent);
  // }, [showContent]);

  return (
    <>
      <div
        onClick={() => zoomIn({ duration: 500 })}
        onMouseEnter={() => setHoveredZoomIn(true)}
        onMouseLeave={() => setHoveredZoomIn(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          backgroundColor: hoveredZoomIn ? "#f3f4f6" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        <ZoomIn strokeWidth={1} />
      </div>
      <div
        onClick={() => zoomOut({ duration: 500 })}
        onMouseEnter={() => setHoveredZoomOut(true)}
        onMouseLeave={() => setHoveredZoomOut(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          backgroundColor: hoveredZoomOut ? "#f3f4f6" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        <ZoomOut strokeWidth={1} />
      </div>
    </>
  );
}
