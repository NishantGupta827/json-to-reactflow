import React, { useState, useRef, useEffect } from "react";
import "./RightSidebar.css";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  disabled: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  disabled,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
        className="custom-select-trigger"
      >
        {value ? (
          value.label
        ) : (
          <span className="custom-select-placeholder">{placeholder}</span>
        )}
      </button>

      {isOpen && (
        <ul className="custom-select-dropdown">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`custom-select-option ${
                value?.value === option.value ? "active" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
