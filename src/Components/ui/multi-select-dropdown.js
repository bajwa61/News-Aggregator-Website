import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({ options, selectedOptions = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        className="w-full px-4 p-2 border border-gray-300 rounded-md bg-white shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-secondary text-sm flex flex-wrap text-white"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option}
                className="bg-secondary text-white px-2 py-1 rounded-md text-xs flex items-center"
              >
                {option}
                <button
                  type="button"
                  className="ml-1 text-gray-500 hover:text-gray-300 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option);
                  }}
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 6l8 8M6 14L14 6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          "Select options"
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-40 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                selectedOptions.includes(option)
                  ? "text-white bg-secondary"
                  : "text-gray-900"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <span
                className={`block truncate ${
                  selectedOptions.includes(option)
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                {option}
              </span>
              {selectedOptions.includes(option) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9l3 3L15 5l-1.5-1.5L8 8 6.5 6.5 5 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
