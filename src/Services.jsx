import React from 'react';
import { Briefcase, User } from 'lucide-react';

const Services = ({ onServiceSelect }) => {
  // This component now only presents the two top-level categories.
  // Clicking either button will directly trigger the selection process
  // and pass a generic service type to the parent component.

  // Handles the selection of a service category
  const handleCategorySelect = (type) => {
    // A simple, generic service object is created to pass to the next component.
    const service = {
      id: type,
      name: type === 'personal' ? 'Personal Issues' : 'Business Issues',
      type: type,
    };
    onServiceSelect(service);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Choose a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Personal Issues category card */}
        <div
          onClick={() => handleCategorySelect('personal')}
          className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center"
        >
          <div className="bg-gray-100 rounded-full p-3 mb-4">
            <User className="text-indigo-500 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Personal Issues</h3>
        </div>
        {/* Business Issues category card */}
        <div
          onClick={() => handleCategorySelect('business')}
          className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center"
        >
          <div className="bg-gray-100 rounded-full p-3 mb-4">
            <Briefcase className="text-indigo-500 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Business Issues</h3>
        </div>
      </div>
    </>
  );
};

export default Services;
