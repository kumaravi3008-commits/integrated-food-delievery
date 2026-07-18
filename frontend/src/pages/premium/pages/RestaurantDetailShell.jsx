import { useMemo, useState } from 'react';
import { Star, MapPin, Clock, Tag, Heart, Share2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import { mockRestaurant } from '../mockData';

function formatRating(rating) {
  return `${rating.toFixed(1)}`;
}

export default function RestaurantDetailShell() {
  const navigate = useNavigate();
  const restaurant = mockRestaurant;

  const [activeCategoryId, setActiveCategoryId] = useState(
    restaurant.categories?.[0]?.id || null
  );

  const activeCategory = useMemo(() => {
    return (
      restaurant.categories?.find((c) => c.id === activeCategoryId) ||
      restaurant.categories?.[0]
    );
  }, [activeCategoryId, restaurant.categories]);

  return (
    <PremiumPageShell
      title={restaurant.name}
      subtitle={`${restaurant.cuisine} • ${restaurant.priceTier}`}
      layout="detail"
    >
      <div className="w-full flex flex-col gap-7">
        {/* Banner + logo */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <div className="absolute inset-0">
            <img
              src={restaurant.bannerImage}
              alt={`${restaurant.name} banner`}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl overflow-hidden border border-white/15 bg-white/[0.03]">
                    <img
                      src={restaurant.logoImage}
                      alt={`${restaurant.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                        <Star size={14} className="text-[#FF7A00]" />
                        <span className="text-sm font-bold">{formatRating(restaurant.rating)}</span>
                      </div>

                      <span className="text-xs text-white/60">({restaurant.ratingCount.toLocaleString()} ratings)</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 text-xs text-white/70">
                        <Clock size={14} className="text-white/70" />
                        {restaurant.etaMins}–{restaurant.etaMins + 8} mins
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-white/70">
                        <MapPin size={14} className="text-white/70" />
                        {restaurant.distanceKm.toFixed(1)} km away
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs">
                        <span
                          className={`px-3 py-1 rounded-full border text-white font-bold tracking-wide text-[11px] ${
                            restaurant.isOpen
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-white/[0.03] border-white/10 text-white/60'
                          }`}
                        >
                          {restaurant.isOpen ? 'OPEN NOW' : 'CLOSED'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex flex-wrap gap-2">
                      {restaurant.offers?.map((o) => (
                        <div key={o.id} className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/10">
                          <Tag size={16} className="text-[#FF7A00]" />
                          <div>
                            <div className="text-xs font-extrabold">{o.title}</div>
                            <div className="text-[11px] text-white/60 leading-tight">{o.subtitle}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-start lg:items-end">
                <button className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#FF7A00] hover:bg-[#d96600] text-black font-extrabold transition-colors">
                  Order from {restaurant.name}
                </button>

                <div className="flex items-center gap-2">
                  <button className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/40 transition-colors flex items-center justify-center">
                    <Heart size={18} className="text-white" />
                  </button>
                  <button className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/40 transition-colors flex items-center justify-center">
                    <Share2 size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:w-[300px] shrink-0">
            <PremiumCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold">Menu Categories</div>
                <div className="text-xs text-white/60">{restaurant.categories?.length || 0}</div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {restaurant.categories?.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategoryId(c.id)}
                    className={
                      'w-full text-left px-4 py-3 rounded-2xl border transition-colors ' +
                      (activeCategoryId === c.id
                        ? 'bg-[#FF7A00]/10 border-[#FF7A00]/30'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20')
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <div className="text-sm font-extrabold">{c.name}</div>
                        <div className="text-[11px] text-white/60 mt-1">{c.items?.length || 0} items</div>
                      </div>
                      <ChevronRight
                        size={18}
                        className={
                          activeCategoryId === c.id
                            ? 'text-[#FF7A00]'
                            : 'text-white/40'
                        }
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-white/60 leading-relaxed">
                Tip: choose a category to see premium menu items instantly.
              </div>
            </PremiumCard>
          </div>

          {/* Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-sm font-extrabold text-white/80">Now showing</div>
                <div className="text-2xl font-extrabold tracking-tight">
                  {activeCategory?.name}
                </div>
              </div>
              <div className="hidden sm:block text-xs text-white/60">
                Smooth hover, wishlist, and quick add next.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activeCategory?.items?.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/dish/${item.id}`)}
                  className="group text-left"
                >
                  <div className="rounded-[26px] bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-xl transition-all duration-300 group-hover:border-[#FF7A00]/30 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(255,122,0,0.15)]">
                    <div className="relative h-40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.vegetarian ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-extrabold">
                            VEG
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-200 text-[11px] font-extrabold">
                            NON-VEG
                          </span>
                        )}
                        {item.isBestseller && (
                          <span className="px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FFB266] text-[11px] font-extrabold">
                            BESTSELLER
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-extrabold tracking-tight">
                            {item.name}
                          </div>
                          <div className="mt-1 text-sm text-white/70 line-clamp-2">
                            {item.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/[0.02] border border-white/10">
                            <Star size={16} className="text-[#FF7A00]" />
                            <span className="text-sm font-extrabold">{item.rating.toFixed(1)}</span>
                          </div>
                          <div className="mt-2 text-xs text-white/60">${item.price.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-white/60">
                          {item.ratingCount.toLocaleString()} reviews
                        </div>
                        <div className="text-xs font-extrabold text-[#FF7A00] group-hover:translate-x-0.5 transition-transform">
                          View & Customize →
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PremiumPageShell>
  );
}


