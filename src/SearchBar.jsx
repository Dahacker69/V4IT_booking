import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import debounce from 'lodash.debounce';

// IMPORTANT: Replace with your actual API key from geoapify.com
const GEOAPIFY_API_KEY = '43377609795543eb8ee3d9f39c73ab8b';

const SearchBar = ({ onLocationFound }) => {
  const [query, setQuery] = useState(''); // Changed to an empty string
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // This function fetches suggestions from the API
  const fetchSuggestions = async (text) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          text
        )}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // This creates a "debounced" version of our fetch function that only runs after 300ms of inactivity
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  // Handles clicking on a suggestion
  const handleSuggestionClick = (feature) => {
    const { lat, lon: lng } = feature.properties;
    setQuery(feature.properties.formatted);
    setSuggestions([]); // Hide suggestions after selection
    onLocationFound({ lat, lng });
  };

  // Handles submitting the form (e.g., pressing Enter)
  const handleFormSubmit = (e) => {
      e.preventDefault();
      // If there are suggestions, use the top one
      if (suggestions.length > 0) {
          handleSuggestionClick(suggestions[0]);
      }
  }

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-11/12 max-w-md">
      <form onSubmit={handleFormSubmit} className="bg-white rounded-full shadow-lg flex items-center relative">
        <div className="pl-4 pr-2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your address..."
          className="w-full py-3 bg-transparent focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
                setQuery('');
                setSuggestions([]);
            }}
            className="p-2 mr-2 text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X size={18} />
          </button>
        )}
      </form>
      
      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg mt-2 absolute w-full max-h-60 overflow-y-auto">
          <ul>
            {isLoading ? (
                <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : (
                suggestions.map((feature) => (
                <li
                    key={feature.properties.place_id}
                    onClick={() => handleSuggestionClick(feature)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                    {feature.properties.formatted}
                </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
