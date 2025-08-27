import React from 'react';
import { User, Briefcase } from 'lucide-react';

const IssueSelector = ({ onIssueSelect, selectedIssue, onNext, isServiceable }) => {
  const issues = [
    { id: 'personal', name: 'Personal Issues', icon: User },
    { id: 'business', name: 'Business Issues', icon: Briefcase },
  ];

  // Updated logic: Button is enabled once an address is checked and an issue is selected.
  const canProceed = isServiceable !== null && selectedIssue;

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Select Service Type</h3>
      </div>
      
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          {issues.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <div
                key={issue.id}
                onClick={() => onIssueSelect(issue)}
                className={`p-4 rounded-lg border-2 flex items-center space-x-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <issue.icon className={`w-8 h-8 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} strokeWidth={1.5} />
                <span className={`font-semibold text-base ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>{issue.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => onNext(selectedIssue)}
          disabled={!canProceed}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          NEXT
        </button>
        {/* Updated help text logic */}
        {isServiceable === null && (
            <p className="text-xs text-center text-gray-500 mt-2">
                Please select an address on the map.
            </p>
        )}
        {isServiceable === false && (
            <p className="text-xs text-center text-red-500 mt-2">
                Warning: Address may be outside our on-site service area.
            </p>
        )}
      </div>
    </div>
  );
};

export default IssueSelector;
