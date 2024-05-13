import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';

// Modal component for input fields
const Modal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = () => {
    // Add your logic to handle saving name and phone number
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-2">Add Contact</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalComponent = ({ columns, data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Rest of your table component code...

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Drawer Button */}
      <button onClick={toggleDrawer} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
        Open Drawer
      </button>

      {/* Modal */}
      <Modal isOpen={isDrawerOpen} onClose={toggleDrawer} />

      {/* Rest of your table component code... */}
    </div>
  );
};

export default ModalComponent;
