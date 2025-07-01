type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled: boolean;
};

export default function ToggleSwitch({
  checked,
  onChange,
  disabled,
}: ToggleSwitchProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={() => {
          onChange(!checked);
          checked = !checked;
        }}
      />
      <span className="slider round"></span>
    </label>
  );
}
