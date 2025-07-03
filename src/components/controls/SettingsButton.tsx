import { Settings } from "lucide-react";

type SettingsButtonProps = {
  onToggle: () => void;
};

function SettingsButton({ onToggle }: SettingsButtonProps) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        cursor: "pointer",
      }}
    >
      <Settings strokeWidth={1} />
    </div>
  );
}

export default SettingsButton;
