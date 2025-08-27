import React from 'react';
import { MapPin } from 'lucide-react';

const IntroPopup = ({ onClose }) => {
  return (
    // This creates a semi-transparent overlay for the popup
    <div className="absolute inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-sm w-full">
        <MapPin className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's Get Started</h2>
        <p className="text-gray-600 mb-6">
          Please select your address by clicking on the map or using the search bar to check for service availability.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default IntroPopup;
