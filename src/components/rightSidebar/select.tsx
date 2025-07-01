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
  modal: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  disabled,
  placeholder = "Select an option",
  modal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropDirectionUp, setDropDirectionUp] = useState(false);

  useEffect(() => {
    const checkSpace = () => {
      if (!dropdownRef.current) return;

      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const dropdownHeight = 160; // match max-height: 10rem (160px)

      setDropDirectionUp(spaceBelow < dropdownHeight);
    };

    if (isOpen) {
      checkSpace();
    }

    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, [isOpen]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="custom-select-wrapper"
      ref={dropdownRef}
      style={modal ? {} : { position: "relative" }}
    >
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
        <div
          className={`custom-select-dropdown ${dropDirectionUp ? "up" : ""}`}
        >
          {options.map((option) => (
            <div
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
