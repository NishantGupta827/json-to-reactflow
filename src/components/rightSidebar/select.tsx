import React, { useState, useRef, useEffect } from "react";

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: "#F7F7F7" }}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
        className="w-full border rounded-md px-3 py-2 text-left shadow-sm hover:border-gray-400 focus:outline-none"
      >
        {value ? (
          value.label
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                value?.value === option.value ? "bg-gray-100 font-medium" : ""
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
