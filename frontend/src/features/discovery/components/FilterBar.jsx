
import { useState, useEffect } from 'react';
import { SlidersHorizontal, Star, MapPin, Layers } from 'lucide-react';

const CATEGORIES = ['All', 'Fine Dining', 'Healthy Options', 'Sushi', 'Fast Food'];

const FilterBar = ({ onFilterChange }) => {
  const [category, setCategory] = useState('All');
  const [distance, setDistance] = useState(10);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ category, distance, rating });
    }
  }, [category, distance, rating, onFilterChange]);

  return (
    <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-6 mb-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <SlidersHorizontal className="text-[#D33F0F]" size={18} />
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">Refine Search Feed</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        
        {/* Slider 1: Distance */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <MapPin size={14} className="text-gray-500" /> Max Distance: 
            <span className="text-[#D33F0F] font-mono text-sm font-black">{distance} km</span>
          </label>
          <input 
            type="range" 
            min="1" 
            max="15" 
            step="0.5"
            value={distance} 
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full accent-[#D33F0F] h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Slider 2: Rating */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Star size={14} className="text-gray-500" /> Minimum Rating: 
            <span className="text-[#D33F0F] font-mono text-sm font-black">{rating === 0 ? 'Any' : `${rating}+ Stars`}</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.1"
            value={rating} 
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="w-full accent-[#D33F0F] h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Picker 3: Cuisine Category */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Layers size={14} className="text-gray-500" /> Cuisine Group
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/5 text-sm font-medium text-gray-200 rounded-xl h-11 px-4 focus:outline-none focus:border-[#D33F0F] transition-colors cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#141414] text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;