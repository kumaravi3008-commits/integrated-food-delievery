import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assumes you're using react-router
// Keep your lucide-react and framer-motion imports...

export default function FoodDetailPage() {
  const { id } = useParams(); // Grabs the item ID from your route URL (e.g., /food/dish-101)
  
  // 1. Initialize data state as null
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Core UI States (we will map these once data is loaded)
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // 3. Fetch Data Engine
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        // Adjust this endpoint URL according to your coworker's API routes
        const response = await fetch(`${baseUrl}/api/food/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch food details");
        }
        
        const data = await response.json();
        
        // Set the primary data state
        setFoodData(data);
        
        // Initialize interactive UI states with the freshly fetched data
        if (data.images && data.images.length > 0) setActiveImage(data.images[0]);
        if (data.customizations?.sizes?.length > 0) setSelectedSize(data.customizations.sizes[0]);
        if (data.customizations?.spiceLevels?.length > 0) setSelectedSpice(data.customizations.spiceLevels[0]);
        setTotalPrice(data.basePrice);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFoodDetails();
    }
  }, [id]);

  // 4. Dynamic Price Calculation Engine
  useEffect(() => {
    if (!foodData) return;

    let computedPrice = foodData.basePrice;
    if (selectedSize) computedPrice += selectedSize.price;
    
    selectedToppings.forEach(topId => {
      const addon = foodData.customizations.toppings.find(t => t.id === topId);
      if (addon) computedPrice += addon.price;
    });
    
    setTotalPrice(computedPrice * quantity);
  }, [quantity, selectedSize, selectedToppings, foodData]);

  const handleToppingToggle = (toppingId) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) ? prev.filter(tId => tId !== toppingId) : [...prev, toppingId]
    );
  };

  // 5. Handling Loading & Error Render Boundaries
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F3F4F6]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Loading DineExpress Premium Experience...</p>
        </div>
      </div>
    );
  }

  if (error || !foodData) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F3F4F6] px-4">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-red-500/20 text-center max-w-sm flex flex-col items-center gap-3">
          <p className="text-sm text-red-400 font-semibold">Error: {error || "Item not found"}</p>
          <button onClick={() => window.location.reload()} className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white font-bold uppercase tracking-wider">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER HTML ---
  // Change all occurrences of "FOOD_DATA" in your return JSX to "foodData"
  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative overflow-x-hidden font-sans pb-16 flex flex-col items-center select-none">
      {/* Rest of your existing JSX code using foodData instead of FOOD_DATA */}
    </div>
  );
}