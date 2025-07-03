import { Maximize, Minimize } from "lucide-react";
import { useState } from "react";

export default function MaximiseButton() {
  const [curr, setCurr] = useState(false);
  const [hovered, setHovered] = useState(false);

  const enterFullScreen = () => {
    setCurr(true);
    document.documentElement.requestFullscreen();
  };

  const exitFullScreen = () => {
    setCurr(false);
    document.exitFullscreen();
  };

  return (
    <div
      onClick={!curr ? enterFullScreen : exitFullScreen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        backgroundColor: hovered ? "#f3f4f6" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      {!curr ? <Maximize strokeWidth={1} /> : <Minimize strokeWidth={1} />}
    </div>
  );
}
