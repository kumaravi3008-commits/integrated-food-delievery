import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, MapPin } from 'lucide-react';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import PageLayout from '../../../components/layout/PageLayout';
import { listRestaurants } from '../../../services/discoveryService';

export default function RestaurantListingShell() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQ = searchParams.get('q') || '';
  const initialOpen = searchParams.get('open') || '';

  const [query, setQuery] = useState(initialQ);
  const [onlyOpen, setOnlyOpen] = useState(initialOpen === '1');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [restaurants, setRestaurants] = useState([]);

  const params = useMemo(() => {
    const p = {};
    if (query.trim()) p.q = query.trim();
    return p;
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listRestaurants(params);
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.restaurants || [];
        setRestaurants(list);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load restaurants');
          setRestaurants([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [params]);

  const filtered = useMemo(() => {
    if (!onlyOpen) return restaurants;
    return restaurants.filter((r) => r.isOpen === true || r.openNow === true || r.open === true);
  }, [restaurants, onlyOpen]);

  const applyToUrl = (nextQuery, nextOnlyOpen) => {
    setSearchParams((prev) => {
      const qv = nextQuery.trim();
      if (!qv) prev.delete('q');
      else prev.set('q', qv);

      if (nextOnlyOpen) prev.set('open', '1');
      else prev.delete('open');

      return prev;
    });
  };

  useEffect(() => {
    applyToUrl(query, onlyOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOnlyOpen = () => {
    const next = !onlyOpen;
    setOnlyOpen(next);
    applyToUrl(query, next);
  };

  return (
    <PremiumPageShell
      title="Restaurants"
      subtitle="Browse restaurants near you with premium filters."
    >
      <div className="w-full flex flex-col gap-6">
          <PremiumCard className="p-5 sm:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by restaurant or cuisine"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#FF7A00]/60"
                />
              </div>

              <button
                type="button"
                onClick={toggleOnlyOpen}
                className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm hover:border-[#FF7A00]/50 transition-colors"
              >
                {onlyOpen ? 'Showing: Open now' : 'Show: Open now'}
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                <SlidersHorizontal size={16} /> Filters via query params
              </div>
            </div>
          </PremiumCard>

          {error ? (
            <PageLayout.Error error={error} />
          ) : null}

          {loading ? (
            <PageLayout.Skeleton count={6} cols={3} />
          ) : null}

          {!loading && filtered.length === 0 && !error ? (
            <PageLayout.Empty
              title="No Results"
              description="Try searching for another restaurant or cuisine."
            />
          ) : null}

          {!loading && filtered.length > 0 ? (
            <PageLayout.Grid cols={3} gap={6}>
              {filtered.map((r) => (
                <PremiumCard key={r.id || r._id} className="p-5 sm:p-6">
                  <button
                    type="button"
                    className="text-left w-full"
                    onClick={() => navigate(`/restaurants/${r.id || r._id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-extrabold tracking-tight">{r.name}</div>
                        <div className="mt-1 text-sm text-white/70">{r.cuisine || r.cuisineType}</div>
                      </div>
                      <div
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          r.isOpen || r.openNow || r.open
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/[0.03] border-white/10 text-white/60'
                        }`}
                      >
                        {r.isOpen || r.openNow || r.open ? 'Open' : 'Closed'}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-white/60 border-t border-white/10 pt-3">
                      <span className="flex items-center gap-2">
                        <Star size={16} className="text-[#FF7A00]" />
                        {typeof r.rating === 'number' ? r.rating.toFixed(1) : r.rating}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {typeof r.distanceKm === 'number' ? `${r.distanceKm.toFixed(1)} km` : r.distanceKm}
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-2/3 bg-[#FF7A00]/70" />
                      </div>
                      <div className="mt-2 text-xs text-white/60">Tap to view menu & place an order.</div>
                    </div>
                  </button>
                </PremiumCard>
              ))}
            </PageLayout.Grid>
          ) : null}
        </div>
    </PremiumPageShell>
  );
}