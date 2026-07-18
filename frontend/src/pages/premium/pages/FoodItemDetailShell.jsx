import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Star, Plus, Minus, Check } from 'lucide-react';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import { mockRestaurant, mockRestaurantNearby } from '../mockData';

function Chip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-4 py-2 rounded-2xl border text-xs font-extrabold transition-colors ' +
        (active
          ? 'bg-[#FF7A00]/15 border-[#FF7A00]/30 text-[#FFB266]'
          : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20')
      }
    >
      {children}
    </button>
  );
}

export default function FoodItemDetailShell() {
  const { id } = useParams();

  // NOTE: This premium UI scaffold is still mock-backed for dish details.

  // TODO: Replace with backend-wired menu item details + add-to-cart.
  // Keeping this component intact to avoid breaking the UI while we wire the rest of the flow.

  // Flatten menu items from the restaurant mock
  const allItems = useMemo(() => {
    const items = [];
    for (const cat of mockRestaurant.categories || []) {
      for (const it of cat.items || []) items.push(it);
    }
    return items;
  }, []);

  const food = useMemo(() => {
    return allItems.find((x) => x.id === id) || allItems[0];
  }, [allItems, id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState(food?.sizes?.[0]?.id);
  const [selectedSpice, setSelectedSpice] = useState(food?.spiceLevels?.[0]);
  const [selectedToppingIds, setSelectedToppingIds] = useState([]);

  const selectedSize = useMemo(() => {
    if (!food?.sizes?.length) return null;
    return food.sizes.find((s) => s.id === selectedSizeId) || food.sizes[0];
  }, [food, selectedSizeId]);

  const selectedToppings = useMemo(() => {
    if (!food?.toppings?.length) return [];
    return selectedToppingIds
      .map((tid) => food.toppings.find((t) => t.id === tid))
      .filter(Boolean);
  }, [food, selectedToppingIds]);

  const computedBase = food?.price || 0;
  const computedPrice = useMemo(() => {
    let p = computedBase;
    if (selectedSize) p += selectedSize.priceDelta || 0;
    if (selectedToppings.length) {
      for (const t of selectedToppings) p += t.price || 0;
    }
    return p * quantity;
  }, [computedBase, selectedSize, selectedToppings, quantity]);

  if (!food) {
    return (
      <PremiumPageShell title="Food" subtitle="Item not found">
        <div className="text-white/70">No item available.</div>
      </PremiumPageShell>
    );
  }

  const toggleTopping = (tid) => {
    setSelectedToppingIds((prev) =>
      prev.includes(tid) ? prev.filter((x) => x !== tid) : [...prev, tid]
    );
  };

  return (
    <PremiumPageShell
      title={food.name}
      subtitle={food.vegetarian ? 'Vegetarian •' : 'Non-Vegetarian •'}
      layout="detail"
    >
      <div className="w-full flex flex-col gap-7">
        {/* Gallery + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          <div>
            <PremiumCard className="p-4">
              <div className="rounded-[26px] overflow-hidden border border-white/10">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-[360px] object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/10">
                  <Star size={16} className="text-[#FF7A00]" />
                  <span className="text-sm font-extrabold">{food.rating.toFixed(1)}</span>
                  <span className="text-xs text-white/60">({food.ratingCount.toLocaleString()})</span>
                </div>

                <button className="ml-auto w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/40 transition-colors flex items-center justify-center">
                  <Heart size={18} className="text-white" />
                </button>
                <button className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/40 transition-colors flex items-center justify-center">
                  <Share2 size={18} className="text-white" />
                </button>
              </div>
            </PremiumCard>
          </div>

          <div>
            <PremiumCard className="p-6">
              <div className="text-sm text-white/60">About</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight">{food.name}</div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {food.description}
              </p>

              <div className="mt-6">
                <div className="text-sm font-extrabold">Ingredients</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {(food.ingredients || []).slice(0, 6).map((ing) => (
                    <li key={ing} className="text-xs px-3 py-2 rounded-2xl bg-white/[0.02] border border-white/10 text-white/70">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4">
                  <div className="text-xs text-white/60">Calories</div>
                  <div className="mt-1 font-extrabold">{food.nutritional?.calories} kcal</div>
                </div>
                <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4">
                  <div className="text-xs text-white/60">Protein</div>
                  <div className="mt-1 font-extrabold">{food.nutritional?.protein}</div>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Customization + checkout panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="text-sm font-extrabold">Size</div>
                <div className="mt-3 flex flex-col gap-2">
                  {(food.sizes || []).map((s) => (
                    <Chip
                      key={s.id}
                      active={selectedSizeId === s.id}
                      onClick={() => setSelectedSizeId(s.id)}
                    >
                      {s.name}{s.priceDelta ? ` (+$${s.priceDelta.toFixed(2)})` : ''}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-extrabold">Spice Level</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(food.spiceLevels || []).map((sp) => (
                    <Chip
                      key={sp}
                      active={selectedSpice === sp}
                      onClick={() => setSelectedSpice(sp)}
                    >
                      {sp}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-extrabold">Toppings & Add-ons</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(food.toppings || []).map((t) => {
                  const active = selectedToppingIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopping(t.id)}
                      className={
                        'px-4 py-2 rounded-2xl border text-xs font-extrabold transition-colors flex items-center gap-2 ' +
                        (active
                          ? 'bg-[#FF7A00]/15 border-[#FF7A00]/30 text-[#FFB266]'
                          : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20')
                      }
                    >
                      {active ? <Check size={14} /> : null}
                      {t.name} {t.price ? `(+ $${t.price.toFixed(2)})` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <PremiumCard className="p-6">
              <div className="text-sm text-white/60">Total</div>
              <div className="mt-2 text-3xl font-extrabold text-[#FF7A00]">
                ${computedPrice.toFixed(2)}
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  Quantity
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 transition-colors flex items-center justify-center"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={18} />
                  </button>
                  <div className="min-w-[40px] text-center font-extrabold text-lg">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 transition-colors flex items-center justify-center"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button className="w-full px-4 py-3 rounded-2xl bg-[#FF7A00] hover:bg-[#d96600] text-black font-extrabold">
                  Add to Cart
                </button>
                <button className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 text-white font-extrabold">
                  Order Now
                </button>
              </div>

              <div className="mt-4 text-xs text-white/60 leading-relaxed">
                Wishlist, reviews, and cart integration can be wired next.
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Reviews + recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-1">
            <PremiumCard className="p-6">
              <div className="text-sm font-extrabold">Customer Reviews</div>
              <div className="mt-3 text-xs text-white/60">
                Top feedback from diners.
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl bg-white/[0.02] border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-sm">User {i + 1}</div>
                      <div className="inline-flex items-center gap-2 text-xs text-[#FFB266] font-extrabold">
                        <Star size={14} /> {food.rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">
                      {i === 0
                        ? 'Perfect spice and great portion. Would order again.'
                        : i === 1
                          ? 'Fresh flavors with a premium feel.'
                          : 'Comfort food at its best.'}
                    </div>
                    <div className="mt-2 text-xs text-white/50">2{0 + i} days ago</div>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <PremiumCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold">Similar Dishes</div>
                  <div className="text-xs text-white/60">From this restaurant</div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {mockRestaurant.categories
                    ?.flatMap((c) => c.items)
                    ?.filter((x) => x.id !== food.id)
                    .slice(0, 3)
                    .map((it) => (
                      <button
                        key={it.id}
                        type="button"
                        className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 hover:border-[#FF7A00]/30 transition-colors text-left"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-14 h-14 rounded-2xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-extrabold text-sm">{it.name}</div>
                            <div className="mt-1 text-xs text-white/60">${it.price.toFixed(2)}</div>
                            <div className="mt-1 text-xs text-white/60">⭐ {it.rating.toFixed(1)}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </PremiumCard>

              <PremiumCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold">Recommended Nearby</div>
                  <div className="text-xs text-white/60">More to explore</div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {mockRestaurantNearby.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 flex gap-3"
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-extrabold text-sm">{r.name}</div>
                        <div className="mt-1 text-xs text-white/60">{r.cuisine}</div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                          <Star size={14} className="text-[#FF7A00]" /> {r.rating.toFixed(1)} • {r.etaMins} mins
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>
    </PremiumPageShell>
  );
}


