import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, XCircle } from 'lucide-react';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import PageLayout from '../../../components/layout/PageLayout';
import { listRestaurants } from '../../../services/discoveryService';

function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function SearchResultsShell() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const debouncedQuery = useDebouncedValue(query, 350);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [results, setResults] = useState([]);

  const q = debouncedQuery.trim();

  const apiParams = useMemo(() => {
    return q ? { q } : {};
  }, [q]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        if (!q) {
          setResults([]);
          setError(null);
          return;
        }

        setLoading(true);
        setError(null);
        const data = await listRestaurants(apiParams);

        if (!cancelled) {
          setResults(Array.isArray(data) ? data : data?.restaurants || []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Search failed');
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [apiParams]);

  const clearQuery = () => {
    setQuery('');
    setSearchParams((prev) => {
      prev.delete('q');
      return prev;
    });
  };

  const submitToUrl = (nextQ) => {
    setSearchParams((prev) => {
      const qv = nextQ.trim();
      if (!qv) {
        prev.delete('q');
      } else {
        prev.set('q', qv);
      }
      return prev;
    });
  };

  useEffect(() => {
    submitToUrl(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PremiumPageShell
      title="Search"
      subtitle={q ? `Results for "${q}"` : 'Search restaurants and dishes'}
    >
      <PageLayout maxWidth="lg">
        <div className="w-full flex flex-col gap-6">
          <PremiumCard className="p-5 sm:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search restaurants or dishes"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#FF7A00]/60"
                />
              </div>

              <div className="flex gap-2">
                {query.trim() ? (
                  <button
                    type="button"
                    onClick={clearQuery}
                    className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm hover:border-[#FF7A00]/50 transition-colors"
                    aria-label="Clear search"
                  >
                    <XCircle size={18} className="inline-block -mt-[2px] mr-1" />
                    Clear
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => submitToUrl(query)}
                  className="px-4 py-3 rounded-2xl bg-[#FF7A00] text-black font-extrabold text-sm hover:bg-[#d96600] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/60 leading-relaxed">
              {loading
                ? 'Searching...'
                : q
                  ? `Showing restaurants that match "${q}".`
                  : 'Type a keyword to start searching.'}
            </div>
          </PremiumCard>

          {error ? (
            <PageLayout.Error error={error} />
          ) : null}

          {!loading && q && results.length === 0 && !error ? (
            <PageLayout.Empty
              title="No Results"
              description="Try a different keyword (e.g., restaurant name or cuisine)."
            />
          ) : null}

          {loading ? (
            <PageLayout.Skeleton count={6} cols={3} />
          ) : null}

          {!loading && results.length > 0 ? (
            <PageLayout.Grid cols={3} gap={6}>
              {results.map((r) => (
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
                      <div className="text-xs font-bold px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/70">
                        {r.priceTier || '$$'}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-white/60 border-t border-white/10 pt-3">
                      <span>{typeof r.rating === 'number' ? `⭐ ${r.rating.toFixed(1)}` : '⭐'}</span>
                      <span>{r.etaMins ? `${r.etaMins} min` : ''}</span>
                    </div>
                  </button>
                </PremiumCard>
              ))}
            </PageLayout.Grid>
          ) : null}
        </div>
      </PageLayout>
    </PremiumPageShell>
  );
}