import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';

// Dropdown component
const DropdownMenu = ({ options, onSelectAll, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    const newSelectedOptions = checked ? options.map((option) => option.value) : [];
    setSelectedOptions(newSelectedOptions);
    onSelectAll(newSelectedOptions);
  };

  const handleOptionChange = (option) => {
    const index = selectedOptions.indexOf(option.value);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option.value]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.value));
    }
    onSelectOption(selectedOptions);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
      <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
        >
         Column  Customize
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ml-20 ${isOpen ? 'transform rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedOptions.length === options.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label htmlFor="selectAll" className="text-sm font-medium text-gray-700">
                Select All
              </label>
            </div>
            {options.map((option) => (
              <div key={option.value} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  id={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option)}
                  className="mr-2"
                />
                <label htmlFor={option.value} className="text-sm font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Table component
const DropDownMenuComponent = ({ columns, data }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle actions based on selected options
  const handleCustomize = (selectedOptions) => {
    console.log('Selected Options:', selectedOptions);
    // Add your logic here based on selected options
  };

  // Rest of your table component code...

  return (
    <div className="flex flex-col items-center  px-4 py-2 " >
      
      {/* Dropdown menu */}
      <DropdownMenu
        options={[
          { label: 'Creation Date', value: 'creationDate' },
          { label: 'Name (AR)', value: 'nameAR' },
          { label: 'Last Login Date & Time', value: 'lastLogin' },
        ]}
        onSelectAll={setSelectedOptions}
        onSelectOption={setSelectedOptions}
      />

    </div>
  );
};

export default DropDownMenuComponent;
