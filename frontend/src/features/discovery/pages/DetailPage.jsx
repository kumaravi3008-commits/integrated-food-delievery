import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// NOTE:
// This page currently acts as a placeholder/detail scaffold.
// ESLint errors and React cascading-render warning were fixed by:
// - removing unused state variables
// - computing derived total price via useMemo instead of setState in an effect

import RestaurantLayout from '../../../components/layout/purpose/RestaurantLayout';

export default function FoodDetailPage() {
  const { id } = useParams();

  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Minimal interactive states (kept for future UI wiring)
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const totalPrice = useMemo(() => {
    if (!foodData) return 0;
    let computedPrice = foodData.basePrice;
    if (selectedSize) computedPrice += selectedSize.price;
    return computedPrice * quantity;
  }, [foodData, selectedSize, quantity]);


  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/food/${id}`);
        if (!response.ok) throw new Error('Failed to fetch food details');
        const data = await response.json();
        setFoodData(data);

        // Optional defaults
        if (data?.customizations?.sizes?.length > 0) {
          setSelectedSize(data.customizations.sizes[0]);
        }
      } catch (err) {
        setError(err?.message || 'Item not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFoodDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F3F4F6]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400">
            Loading DineExpress Premium Experience...
          </p>
        </div>
      </div>
    );
  }

  if (error || !foodData) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F3F4F6] px-4">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-red-500/20 text-center max-w-sm flex flex-col items-center gap-3">
          <p className="text-sm text-red-400 font-semibold">Error: {error || 'Item not found'}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white font-bold uppercase tracking-wider"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <RestaurantLayout showFooter={false}>
      <div className="py-10">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">



          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {foodData?.name || 'Food Item'}
            </h1>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              {foodData?.description || 'Premium item detail coming soon.'}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Quantity</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 text-white"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="min-w-[36px] text-center font-bold">{quantity}</span>
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 text-white"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[360px]">
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5">
              <div className="text-sm text-white/70">Total Price</div>
              <div className="mt-2 text-3xl font-extrabold text-[#FF7A00]">
                ${totalPrice.toFixed(2)}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FF7A00] hover:bg-[#d96600] text-black font-extrabold"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/50 text-white font-extrabold"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: replace placeholder with full premium food detail UI */}
      </div>
    </RestaurantLayout>

  );
}



