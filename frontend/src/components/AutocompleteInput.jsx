import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react'; // Optional: icon library like Lucide
import Axios from '../api/Axios';

const AutocompleteInput = ({ label, placeholder, value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSuggestions = async (input) => {
    setValue(input);
    if (input.length > 2) {
      try {
        const res = await axios.get(`https://photon.komoot.io/api/?q=${input}&limit=5`);
        setSuggestions(res.data.features);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    const fullText = `${place.properties.name || ''}, ${place.properties.city || ''}, ${place.properties.country || ''}`;
    setValue(fullText);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <label className="absolute text-sm text-gray-500 transform transition-all duration-200 left-4 top-2.5 pointer-events-none z-10">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => fetchSuggestions(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // delay to allow click
          placeholder={placeholder}
          className="w-full px-12 py-3 rounded-xl bg-white/90 border border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-300 focus:outline-none text-gray-800 placeholder-transparent"
        />
        <Search className="absolute left-4 top-3 text-gray-500 h-5 w-5" />
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-teal-100 cursor-pointer text-sm text-gray-700 transition"
            >
              {place.properties.name}, {place.properties.city}, {place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
