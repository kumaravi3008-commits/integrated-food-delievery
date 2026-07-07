import { useState } from 'react';

import FilterBar from '../components/FilterBar';
import MerchantCard from '../components/MerchantCard';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { Compass, Loader2 } from 'lucide-react';

// Temporary Mock Data that mimics what your backend $geoNear pipeline will return
const MOCK_RESTAURANTS = [
  { id: '1', name: 'Le Chic Bistro', cuisine: 'Fine Dining', rating: 4.9, distance: 1.2, deliveryTime: 25, priceRange: '$$$', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600' },
  { id: '2', name: 'Green Garden Cafe', cuisine: 'Healthy Options', rating: 4.5, distance: 3.4, deliveryTime: 15, priceRange: '$$', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600' },
  { id: '3', name: 'Ninja Sushi Bar', cuisine: 'Sushi', rating: 4.7, distance: 0.8, deliveryTime: 20, priceRange: '$$', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600' },
  { id: '4', name: 'The Flame Grill', cuisine: 'Fast Food', rating: 4.2, distance: 6.1, deliveryTime: 30, priceRange: '$', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' },
];

const ExplorePage = () => {
  const { loaded, coordinates, error } = useGeolocation();
  const [filteredRestaurants, setFilteredRestaurants] = useState(MOCK_RESTAURANTS);

  const handleFilterChange = (filters) => {
    // Client-side simulation of backend query filtering logic
    const dynamicResults = MOCK_RESTAURANTS.filter((item) => {
      const matchesDistance = item.distance <= filters.distance;
      const matchesRating = item.rating >= filters.rating;
      const matchesCategory = filters.category === 'All' || item.cuisine === filters.category;
      return matchesDistance && matchesRating && matchesCategory;
    });

    setFilteredRestaurants(dynamicResults);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Block */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
            <Compass className="animate-spin-slow" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nearby Merchants</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {loaded
                ? `Coordinates locked: ${Number(coordinates.lat).toFixed(4)}, ${Number(coordinates.lng).toFixed(4)}`
                : 'Fetching your spatial location...'}
            </p>
            {error ? (
              <p className="mt-2 text-xs text-red-400">{error}</p>
            ) : null}
          </div>
        </div>

        {/* Filters Interface Control Section */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* Dynamic Display Grid */}
        {!loaded ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-500">
            <Loader2 className="animate-spin text-orange-500" size={32} />
            <p className="text-sm font-medium">Resolving your location matrix...</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
            <p className="text-gray-400 text-sm">No restaurants found matching those spacing rules or distance metrics.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <MerchantCard 
                key={restaurant.id} 
                merchant={restaurant} 
                onSelect={() => console.log(`Selected restaurant ID: ${restaurant.id}`)} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ExplorePage;