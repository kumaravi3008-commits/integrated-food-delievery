import { useMemo, useState, useEffect, useCallback } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Star, MapPin, X } from 'lucide-react';

import api from '../../../api/axios';
import { RESTAURANTS as HOME_DATA_RESTAURANTS } from '../../discovery/pages/home/Homedata';
import PremiumCard from '../../../pages/premium/PremiumCard';
import PremiumPageShell from '../../../pages/premium/PremiumPageShell';
import PageLayout from '../../../components/layout/PageLayout';

export default function RestaurantListingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get('query') || '';
  const urlLocation = searchParams.get('location') || '';
  const urlMode = searchParams.get('mode') || '';

  const [query, setQuery] = useState(urlQuery);
  const [onlyOpen, setOnlyOpen] = useState(false);

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchRestaurants = useCallback(async (search, location, mode) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (location) params.location = location;
      if (mode) params.mode = mode;
      const { data } = await api.get('/restaurants', { params });
      const results = data.data ?? data;
      setRestaurants(Array.isArray(results) ? results : []);
    } catch (err) {
      console.warn('Backend unavailable, falling back to local Homedata:', err);
      // Fall back to Homedata static dataset
      let fallback = [...HOME_DATA_RESTAURANTS];
      if (mode === 'order') {
        fallback = fallback.filter((r) => r.type === 'delivery');
      }
      setRestaurants(fallback);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync local query state when URL params change (e.g., new Hero search)
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    fetchRestaurants(urlQuery, urlLocation, urlMode);
  }, [urlQuery, urlLocation, urlMode, fetchRestaurants]);

  const filtered = useMemo(() => {
    if (!restaurants.length) return [];
    return restaurants.filter((r) => (onlyOpen ? r.isOpen !== false : true));
  }, [restaurants, onlyOpen]);

  const hasActiveFilters = urlQuery || urlLocation;

  const clearFilters = () => {
    navigate('/restaurants');
    setQuery('');
  };

  return (
    <PremiumPageShell
      title="Restaurants"
      subtitle="Premium picks curated for speed, quality, and cravings."
    >
      <PageLayout maxWidth="full" className="pb-10 sm:pb-12 lg:pb-14">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Top controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by restaurant or cuisine"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#FF7A00]/60"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyOpen((v) => !v)}
              className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm hover:border-[#FF7A00]/50 transition-colors"
            >
              {onlyOpen ? 'Showing: Open now' : 'Show: Open now'}
            </button>
          </div>

          {/* Active search header */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 bg-[#FF7A00]/10 border border-[#FF7A00]/25 rounded-2xl px-5 py-3">
              <span className="text-sm text-gray-300">
                Showing results for{urlQuery ? ` "${urlQuery}"` : ''}
                {urlLocation ? ` in "${urlLocation}"` : ''}
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Clear search filters"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Searching restaurants...</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-sm text-red-400">{error}</p>
              <button
                type="button"
                onClick={() => fetchRestaurants(urlQuery, urlLocation)}
                className="text-sm text-[#FF7A00] hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Search className="w-10 h-10 text-gray-600" />
              <p className="text-sm text-gray-400">
                {hasActiveFilters
                  ? 'No restaurants found matching your search. Try a different keyword or location.'
                  : 'No restaurants available right now.'}
              </p>
            </div>
          )}

          {/* Restaurant grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="pt-2">
              <PageLayout.Grid cols={3} gap={6}>
                {filtered.map((r) => (
                  <PremiumCard key={r._id || r.id} className="h-full p-5 sm:p-6">
                    <button
                      type="button"
                      className="text-left w-full"
                      onClick={() => navigate(`/restaurants/${r._id || r.id}`)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-base font-bold tracking-tight">{r.name}</h2>
                          <p className="mt-1 text-sm text-white/70">
                            {Array.isArray(r.cuisine) ? r.cuisine.join(' • ') : r.cuisine}
                          </p>
                        </div>
                        <div
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            r.isOpen !== false
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-white/[0.03] border-white/10 text-white/60'
                          }`}
                        >
                          {r.isOpen !== false ? 'Open' : 'Closed'}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Star size={16} className="text-[#FF7A00]" />
                          <span className="font-bold text-white">{r.rating || '—'}</span>
                          {r.etaMins && (
                            <>
                              <span className="text-white/60">•</span>
                              <span className="text-white/60">{r.etaMins} min</span>
                            </>
                          )}
                        </div>
                        {r.priceTier && (
                          <div className="text-xs text-white/60">{r.priceTier}</div>
                        )}
                      </div>

                      {r.address && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {r.address}
                        </div>
                      )}

                      <div className="mt-5">
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full w-2/3 bg-[#FF7A00]/70" />
                        </div>
                        <p className="mt-2 text-xs text-white/60">
                          Tap to view menu & place an order.
                        </p>
                      </div>
                    </button>
                  </PremiumCard>
                ))}
              </PageLayout.Grid>
            </div>
          )}
        </div>
      </PageLayout>
    </PremiumPageShell>
  );
}

