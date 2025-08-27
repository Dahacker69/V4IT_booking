import React, { useState } from 'react';
import { Car, Headset, ChevronLeft } from 'lucide-react';

const SupportTypeSelector = ({ selectedIssue, onSupportTypeSelect, onBack, isServiceable }) => {
  const [selectedSupport, setSelectedSupport] = useState(null);

  const supportTypes = [
    // The 'disabled' property is now controlled by the isServiceable prop
    { id: 'onsite', name: '1 Hour Onsite Support', price: 149.00, icon: Car, disabled: !isServiceable },
    { id: 'remote', name: '45 Minutes Remote Support', price: 99.00, icon: Headset, disabled: false },
  ];

  const handleNext = () => {
    const finalService = {
      ...selectedSupport,
      issueType: selectedIssue.name,
      fullServiceName: `${selectedSupport.name} for ${selectedIssue.name}`
    };
    onSupportTypeSelect(finalService);
  };

  const handleSelect = (type) => {
    if (type.disabled) return; // Prevent selection of disabled options
    setSelectedSupport(type);
  }

  return (
    <div className="flex flex-col h-full bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-2">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-lg font-bold text-gray-800">Select Support Type</h3>
      </div>
      
      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-500 mb-2">For: {selectedIssue.name}</p>
        <div className="grid grid-cols-2 gap-4">
          {supportTypes.map((type) => {
            const isSelected = selectedSupport?.id === type.id;
            return (
              <div
                key={type.id}
                onClick={() => handleSelect(type)}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-gray-50 border-gray-200'
                } ${
                  type.disabled
                    ? 'opacity-50 cursor-not-allowed' // Style for disabled state
                    : 'cursor-pointer hover:border-blue-300'
                }`}
              >
                <type.icon className={`w-10 h-10 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} strokeWidth={1.5} />
                <span className={`font-semibold text-sm ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>{type.name}</span>
                <p className="text-xs text-gray-500 mt-1">${type.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        {!isServiceable && (
            <p className="text-xs text-center text-red-500 mt-4">On-site support is not available for the selected address. Please choose remote support.</p>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total</span>
          <span className="font-bold text-lg">${selectedSupport ? selectedSupport.price.toFixed(2) : '0.00'}</span>
        </div>
        <button
          onClick={handleNext}
          disabled={!selectedSupport}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default SupportTypeSelector;
