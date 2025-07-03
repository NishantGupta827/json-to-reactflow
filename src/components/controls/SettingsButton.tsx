import { Settings } from "lucide-react";
import { useState } from "react";

type SettingsButtonProps = {
  onToggle: () => void;
};

function SettingsButton({ onToggle }: SettingsButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
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
      <Settings strokeWidth={1} />
    </div>
  );
}

export default SettingsButton;
