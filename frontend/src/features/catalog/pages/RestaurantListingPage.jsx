import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';

import PremiumCard from '../../../pages/premium/PremiumCard';
import PremiumPageShell from '../../../pages/premium/PremiumPageShell';

const mockRestaurants = [
  {
    id: 'r1',
    name: 'Saffron Spoon',
    cuisine: 'Indian • Biryani & Kebabs',
    rating: 4.7,
    etaMins: 28,
    priceTier: '$$',
    isOpen: true,
  },
  {
    id: 'r2',
    name: 'Green Bowl',
    cuisine: 'Healthy • Salads & Bowls',
    rating: 4.5,
    etaMins: 22,
    priceTier: '$$',
    isOpen: true,
  },
  {
    id: 'r3',
    name: 'Urban Flame',
    cuisine: 'American • Burgers & Wings',
    rating: 4.6,
    etaMins: 35,
    priceTier: '$',
    isOpen: false,
  },
];

export default function RestaurantListingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  const restaurants = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockRestaurants
      .filter((r) => (onlyOpen ? r.isOpen : true))
      .filter((r) => {
        if (!q) return true;
        return (
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
        );
      });
  }, [query, onlyOpen]);

  return (
    <PremiumPageShell
      title="Restaurants"
      subtitle="Premium picks curated for speed, quality, and cravings."
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.map((r) => (
            <PremiumCard key={r.id} className="p-5">
              <button
                type="button"
                className="text-left w-full"
                onClick={() => navigate(`/restaurants/${r.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold tracking-tight">
                      {r.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/70">{r.cuisine}</p>
                  </div>
                  <div
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      r.isOpen
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-white/[0.03] border-white/10 text-white/60'
                    }`}
                  >
                    {r.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Star size={16} className="text-[#FF7A00]" />
                    <span className="font-bold text-white">{r.rating}</span>
                    <span className="text-white/60">• {r.etaMins} min</span>
                  </div>
                  <div className="text-xs text-white/60">{r.priceTier}</div>
                </div>

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
        </div>
      </div>
    </PremiumPageShell>
  );
}

