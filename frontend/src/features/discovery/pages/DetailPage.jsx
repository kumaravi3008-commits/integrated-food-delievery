import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Clock, MapPin, ShoppingBag, Heart, Share2, Plus, Minus, 
  Check, ChevronDown, MessageSquare, ShieldCheck, Percent, HelpCircle, 
  ArrowUp, Headphones, Navigation, ChevronRight, Info
} from "lucide-react";

// ==========================================
// MOCK DATA (High-Quality Premium Assets)
// ==========================================
const FOOD_DATA = {
  id: "dish-101",
  name: "Smoked Truffle Butter Glazed Burger",
  restaurantName: "The Charcoal Room",
  restaurantId: "rest-001",
  cuisine: "Gourmet American",
  category: "Premium Burgers",
  rating: 4.9,
  totalReviews: 1240,
  deliveryTime: "20-25 mins",
  distance: "1.8 km",
  isVeg: false,
  isBestseller: true,
  isSponsored: false,
  basePrice: 429,
  originalPrice: 599,
  discount: "28% OFF",
  description: "An artisanal masterpiece featuring aged Angus beef patty, hand-churned white truffle butter, oak-smoked cheddar, and caramelized organic onions cradled in a toasted, freshly baked golden brioche bun. Served with a side of rosemary sea-salt wedges.",
  images: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80"
  ],
  ingredients: ["Aged Angus Beef", "Truffle Butter", "Smoked Cheddar", "Brioche Bun", "Caramelized Onions", "Rosemary Wedges"],
  allergens: ["Gluten", "Dairy", "Mustard"],
  nutrition: { calories: 740, protein: "38g", carbs: "48g", fat: "34g" },
  customizations: {
    sizes: [
      { id: "s-sm", name: "Single Patty", price: 0 },
      { id: "s-md", name: "Double Patty (Heavyweight)", price: 120 },
      { id: "s-lg", name: "Triple Stack (The Beast)", price: 220 }
    ],
    spiceLevels: [
      { id: "sp-mild", name: "Mild (Default)" },
      { id: "sp-med", name: "Medium Hot" },
      { id: "sp-hot", name: "Extra Smokin' Spicy" }
    ],
    toppings: [
      { id: "t-cheese", name: "Extra Oak-Smoked Cheddar", price: 45 },
      { id: "t-bacon", name: "Crispy Maple Bacon Strip", price: 80 },
      { id: "t-egg", name: "Fried Farm Egg", price: 30 },
      { id: "t-truffle", name: "Extra Truffle Aioli Shot", price: 50 }
    ],
    sauces: [
      { id: "sc-bbq", name: "Hickory BBQ Sauce", checked: true },
      { id: "sc-aioli", name: "Garlic Truffle Mayo", checked: false },
      { id: "sc-spicy", name: "Ghost Pepper Relish", checked: false }
    ]
  },
  restaurant: {
    name: "The Charcoal Room",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80",
    rating: "4.8",
    verified: true,
    address: "Premium High Street, Block C, Cyber City",
    distance: "1.8 km",
    hours: "11:00 AM - 11:30 PM",
    deliveryFee: "₹29",
    minOrder: "₹199",
    tags: ["Fast Delivery", "Family Friendly", "Gourmet", "Live Tracking"]
  },
  coupons: [
    { code: "DINEPREMIUM", desc: "Flat 30% OFF on premium items up to ₹150", applyText: "Apply" },
    { code: "FREEFEAST", desc: "Free Delivery on orders above ₹499", applyText: "Apply" },
    { code: "BOGOCHEF", desc: "Buy 1 Get 1 Free (Special Chef's Choice Match)", applyText: "Apply" }
  ],
  reviews: [
    {
      id: "rev-1",
      name: "Rohan Malhotra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely breathtaking flavor profile. The truffle butter literally melts instantly and integrates beautifully with the smoked cheddar. Packaging was pristine!",
      images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80"]
    },
    {
      id: "rev-2",
      name: "Sneha Kurian",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 5,
      date: "1 week ago",
      comment: "A proper gourmet experience delivered right to my doorstep. Totally worth every single rupee. Double patty customization is highly recommended!",
      images: []
    }
  ],
  similarDishes: [
    { id: "sim-1", name: "Smoked Texas BBQ Burger", price: 389, rating: 4.8, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80" },
    { id: "sim-2", name: "Crispy Peri-Peri Chicken Melt", price: 349, rating: 4.7, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80" },
    { id: "sim-3", name: "Truffle Parmesan Fries", price: 199, rating: 4.9, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" }
  ],
  frequentlyBought: [
    { id: "freq-1", name: "Salted Caramel Milkshake", price: 189, rating: 4.8, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80" },
    { id: "freq-2", name: "Loaded Cheese Potato Dippers", price: 159, rating: 4.6, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" }
  ],
  faqs: [
    { q: "Is this dish spicy?", a: "By default, the Truffle Butter Burger is mild. You can customize the spice level to 'Medium Hot' or 'Extra Smokin Spicy' according to your preference!" },
    { q: "Can I customize or swap ingredients?", a: "Yes! You can completely adjust the size, add premium toppings, select extra sauces, or specify dietary comments during check-out." },
    { q: "Is it freshly prepared?", a: "Always. Our restaurant partners prepare food immediately upon order confirmation to ensure gourmet quality." }
  ]
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function DetailPage() {
  const [activeImage, setActiveImage] = useState(FOOD_DATA.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(FOOD_DATA.customizations.sizes[0]);
  const [selectedSpice, setSelectedSpice] = useState(FOOD_DATA.customizations.spiceLevels[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState(
    FOOD_DATA.customizations.sauces.filter(s => s.checked).map(s => s.id)
  );
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [totalPrice, setTotalPrice] = useState(FOOD_DATA.basePrice);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor Scroll for floating elements
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Dynamic Customization Pricing
  useEffect(() => {
    let price = FOOD_DATA.basePrice;
    price += selectedSize.price;
    selectedToppings.forEach(topId => {
      const top = FOOD_DATA.customizations.toppings.find(t => t.id === topId);
      if (top) price += top.price;
    });
    setTotalPrice(price * quantity);
  }, [quantity, selectedSize, selectedToppings]);

  const handleToppingToggle = (id) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleSauceToggle = (id) => {
    setSelectedSauces(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative overflow-hidden font-sans pb-24 lg:pb-12">
      
      {/* Parallax Atmospheric Background Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#FF7A00]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF7A00]/5 blur-[120px] pointer-events-none" />

      {/* ==========================================
          1. STICKY NAVIGATION
          ========================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#050505]/70 border-b border-white/5 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-amber-500 flex items-center justify-center shadow-lg shadow-[#FF7A00]/20">
              <span className="font-extrabold text-black text-xl tracking-tight">D</span>
            </div>
            <span className="font-extrabold text-white text-xl tracking-wide hidden sm:block">
              Dine<span className="text-[#FF7A00]">Express</span>
            </span>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus-within:border-[#FF7A00]/50 transition-all">
            <input 
              type="text" 
              placeholder="Search dishes, restaurants or cuisines..." 
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Location & Utilities */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/5">
              <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Cyber City, Phase 2</span>
            </div>

            {/* Notification/Cart Bar */}
            <div className="flex items-center gap-2.5">
              <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-gray-300 hover:text-white">
                <Heart className="w-4 h-4" />
              </button>
              
              <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all relative text-gray-300 hover:text-white">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF7A00] text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {quantity}
                </span>
              </button>

              {/* User profile dropdown */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN LAYOUT CONTAINER
          ========================================== */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-10">

        {/* 2. HERO FOOD SECTION (Grid layout: Gallery & Info) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Large Food Image Gallery (LHS: 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <motion.div 
              layoutId="main-image"
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 group shadow-2xl"
            >
              <img 
                src={activeImage} 
                alt={FOOD_DATA.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Float Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {FOOD_DATA.isBestseller && (
                  <span className="bg-gradient-to-r from-amber-500 to-[#FF7A00] text-black text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Bestseller
                  </span>
                )}
                {FOOD_DATA.isSponsored && (
                  <span className="bg-black/70 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                    Sponsored
                  </span>
                )}
              </div>

              {/* Veg / Non-Veg Indicator */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                <div className={`w-3.5 h-3.5 border-2 ${FOOD_DATA.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-[2px]`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${FOOD_DATA.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                </div>
              </div>
            </motion.div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {FOOD_DATA.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 bg-white/5 transition-all ${
                    activeImage === img ? 'border-[#FF7A00] scale-95' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Food Information (RHS: 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mb-1 uppercase tracking-widest">
                <span>{FOOD_DATA.cuisine}</span>
                <span>•</span>
                <span className="text-[#FF7A00]">{FOOD_DATA.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                {FOOD_DATA.name}
              </h1>
              <p className="text-sm text-gray-400">
                Prepared by <span className="text-white hover:underline cursor-pointer font-medium">{FOOD_DATA.restaurantName}</span>
              </p>
            </div>

            {/* Quick Specs (Rating, Delivery, Distance) */}
            <div className="flex flex-wrap gap-4 items-center py-4 border-y border-white/5">
              <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{FOOD_DATA.rating} ({FOOD_DATA.totalReviews}+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>{FOOD_DATA.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                <Navigation className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>{FOOD_DATA.distance} away</span>
              </div>
            </div>

            {/* Animated Price Section & Quantity Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                  Premium Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#FF7A00]">
                    ₹{(selectedSize.price + FOOD_DATA.basePrice) * quantity}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{FOOD_DATA.originalPrice * quantity}
                  </span>
                  <span className="text-xs bg-[#FF7A00]/25 text-[#FF7A00] font-extrabold px-1.5 py-0.5 rounded">
                    {FOOD_DATA.discount}
                  </span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Interaction Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:opacity-95 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-[#FF7A00]/20 flex items-center justify-center gap-2 transition-all">
                <ShoppingBag className="w-4 h-4 text-black stroke-[3px]" />
                ADD TO EXPRESS CART
              </button>
              <button className="py-4 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm tracking-wide border border-white/10 flex items-center justify-center gap-2 transition-all">
                ORDER NOW
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border border-white/10 flex items-center justify-center transition-all ${
                    isWishlisted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center justify-center transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FOOD DESCRIPTION & NUTRITION */}
        <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-white">Culinary Experience & Description</h2>
          <div className="text-gray-300 text-sm leading-relaxed mb-4 max-w-4xl">
            {isDescExpanded ? FOOD_DATA.description : `${FOOD_DATA.description.slice(0, 160)}...`}
            <button 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-[#FF7A00] hover:underline font-semibold ml-1 focus:outline-none"
            >
              {isDescExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            {/* Ingredients & Allergens */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Key Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {FOOD_DATA.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs bg-white/5 px-2.5 py-1 rounded-md text-gray-300 border border-white/5">
                    {ing}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Contains Allergens</p>
                <p className="text-xs text-amber-400 font-medium">⚠️ {FOOD_DATA.allergens.join(", ")}</p>
              </div>
            </div>

            {/* Nutrition Information */}
            <div className="bg-white/[0.01] p-4 rounded-2xl border border-white/5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#FF7A00]" /> Nutritional Index (Per Portion)
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block">Calories</span>
                  <span className="text-sm font-bold text-white">{FOOD_DATA.nutrition.calories} kcal</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block">Protein</span>
                  <span className="text-sm font-bold text-[#FF7A00]">{FOOD_DATA.nutrition.protein}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block">Carbs</span>
                  <span className="text-sm font-bold text-white">{FOOD_DATA.nutrition.carbs}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block">Fat</span>
                  <span className="text-sm font-bold text-white">{FOOD_DATA.nutrition.fat}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CUSTOMIZATIONS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Sizes & Spiciness options */}
          <div className="flex flex-col gap-6">
            {/* Choose Size */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-base font-bold text-white mb-3 uppercase tracking-wider">1. Select Size Options</h3>
              <div className="flex flex-col gap-2">
                {FOOD_DATA.customizations.sizes.map((sz) => (
                  <label 
                    key={sz.id}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedSize.id === sz.id 
                        ? 'bg-[#FF7A00]/10 border-[#FF7A00]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm font-semibold">{sz.name}</span>
                    <div className="flex items-center gap-3">
                      {sz.price > 0 && <span className="text-xs text-[#FF7A00] font-bold">+₹{sz.price}</span>}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSize.id === sz.id ? 'border-[#FF7A00]' : 'border-gray-500'}`}>
                        {selectedSize.id === sz.id && <div className="w-2.5 h-2.5 bg-[#FF7A00] rounded-full" />}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Choose Spice Level */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-base font-bold text-white mb-3 uppercase tracking-wider">2. Spice Adjustments</h3>
              <div className="flex flex-col gap-2">
                {FOOD_DATA.customizations.spiceLevels.map((sp) => (
                  <label 
                    key={sp.id}
                    onClick={() => setSelectedSpice(sp)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedSpice.id === sp.id 
                        ? 'bg-[#FF7A00]/10 border-[#FF7A00]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm font-semibold">{sp.name}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSpice.id === sp.id ? 'border-[#FF7A00]' : 'border-gray-500'}`}>
                      {selectedSpice.id === sp.id && <div className="w-2.5 h-2.5 bg-[#FF7A00] rounded-full" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Toppings & Sauces */}
          <div className="flex flex-col gap-6">
            {/* Choose Toppings */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-base font-bold text-white mb-3 uppercase tracking-wider">3. Add Extra Toppings</h3>
              <div className="flex flex-col gap-2">
                {FOOD_DATA.customizations.toppings.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <div 
                      key={top.id}
                      onClick={() => handleToppingToggle(top.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? 'bg-[#FF7A00]/10 border-[#FF7A00]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm font-semibold">{top.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#FF7A00] font-bold">+₹{top.price}</span>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isChecked ? 'bg-[#FF7A00] border-[#FF7A00]' : 'border-gray-500'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sauces Selection */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-base font-bold text-white mb-3 uppercase tracking-wider">4. Select Sauces</h3>
              <div className="flex flex-col gap-2">
                {FOOD_DATA.customizations.sauces.map((sauce) => {
                  const isChecked = selectedSauces.includes(sauce.id);
                  return (
                    <div 
                      key={sauce.id}
                      onClick={() => handleSauceToggle(sauce.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? 'bg-[#FF7A00]/10 border-[#FF7A00]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm font-semibold">{sauce.name}</span>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isChecked ? 'bg-[#FF7A00] border-[#FF7A00]' : 'border-gray-500'}`}>
                        {isChecked && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. RESTAURANT INFORMATION CARD */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white/[0.02] border border-white/5 rounded-3xl p-6 items-center">
          <div className="md:col-span-3 aspect-square max-w-[180px] rounded-2xl overflow-hidden border border-white/10">
            <img src={FOOD_DATA.restaurant.image} alt="Restaurant" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-6 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl font-extrabold text-white">{FOOD_DATA.restaurant.name}</h3>
              {FOOD_DATA.restaurant.verified && <ShieldCheck className="w-4 h-4 text-[#FF7A00] fill-black" />}
            </div>
            <p className="text-xs text-gray-400">{FOOD_DATA.restaurant.address}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Rating</span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">★ {FOOD_DATA.restaurant.rating}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Min Order</span>
                <span className="text-xs font-bold text-white">{FOOD_DATA.restaurant.minOrder}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Delivery Fee</span>
                <span className="text-xs font-bold text-[#FF7A00]">{FOOD_DATA.restaurant.deliveryFee}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Hours</span>
                <span className="text-xs font-bold text-white">{FOOD_DATA.restaurant.hours}</span>
              </div>
            </div>

            {/* Restaurant Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {FOOD_DATA.restaurant.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] font-bold bg-[#FF7A00]/5 text-[#FF7A00] border border-[#FF7A00]/10 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col gap-2.5 w-full">
            <button className="py-2.5 px-4 w-full rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold tracking-wider transition-all">
              VISIT RESTAURANT
            </button>
            <button className="py-2.5 px-4 w-full rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/20 hover:bg-[#FF7A00]/15 text-[#FF7A00] text-xs font-bold tracking-wider transition-all">
              VIEW FULL MENU
            </button>
          </div>
        </section>

        {/* 6. OFFERS & COUPONS */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Coupons & Special Offers Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FOOD_DATA.coupons.map((coupon, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-gradient-to-tr from-white/[0.02] to-white/[0.04] border border-white/5 flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="absolute top-[-20px] right-[-20px] w-[60px] h-[60px] bg-[#FF7A00]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#FF7A00]/10 text-[#FF7A00]">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-sm text-[#FF7A00] tracking-wide">{coupon.code}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">{coupon.desc}</p>
                <button className="text-xs text-white font-extrabold flex items-center justify-between mt-1 hover:text-[#FF7A00] transition-colors group">
                  <span>{coupon.applyText}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CUSTOMER REVIEWS */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Guest Reviews & Ratings</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by</span>
              <select className="bg-[#050505] border border-white/15 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-[#FF7A00]">
                <option>Highest Rating</option>
                <option>Latest</option>
                <option>Lowest Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOOD_DATA.reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        {rev.name}
                        {rev.verified && <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded">Verified</span>}
                      </h4>
                      <p className="text-[10px] text-gray-500">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                {rev.images.length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {rev.images.map((img, i) => (
                      <img key={i} src={img} alt="Review attachment" className="w-14 h-14 rounded-lg object-cover border border-white/10" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. FREQUENTLY BOUGHT TOGETHER */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Frequently Bought Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOOD_DATA.frequentlyBought.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#FF7A00] transition-colors">{item.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-sm text-[#FF7A00]">₹{item.price}</span>
                    <button className="py-1 px-3 bg-white/5 hover:bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20 text-xs font-bold rounded-lg transition-all">
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. SIMILAR DISHES */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white">Similar Gourmet Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FOOD_DATA.similarDishes.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5 flex flex-col gap-3 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/5 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-gray-300">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#FF7A00] transition-colors truncate">{item.name}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-extrabold text-sm text-[#FF7A00]">₹{item.price}</span>
                    <button className="py-1 px-3 rounded-lg bg-[#FF7A00] hover:opacity-95 text-black text-xs font-extrabold flex items-center gap-1">
                      Add <Plus className="w-3 h-3 stroke-[3px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. DELIVERY INFORMATION */}
        <section className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Estimated Delivery Frame</p>
              <h4 className="text-lg font-black text-white">Express arriving in 20 - 25 minutes</h4>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-400 uppercase font-semibold">UPI Accepted</span>
            <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-400 uppercase font-semibold">Cards Accepted</span>
            <span className="text-[10px] bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md text-green-400 uppercase font-bold">COD Available</span>
          </div>
        </section>

        {/* 11. FAQ ACCORDION */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-2.5">
            {FOOD_DATA.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <button 
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-white focus:outline-none hover:bg-white/[0.02]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-[#FF7A00]' : 'text-gray-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-white/[0.02] text-xs text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ==========================================
          12. STICKY BOTTOM ORDER BAR (MOBILE ONLY)
          ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-md border-t border-white/10 px-4 py-3.5 flex items-center justify-between gap-3 lg:hidden shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">Order Total</span>
          <span className="text-xl font-black text-[#FF7A00]">₹{(selectedSize.price + FOOD_DATA.basePrice) * quantity}</span>
        </div>
        <button className="flex-1 py-3 px-5 rounded-xl bg-[#FF7A00] hover:opacity-95 text-black font-extrabold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF7A00]/10">
          <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
          ADD TO CART ({quantity})
        </button>
      </div>

      {/* ==========================================
          13. FLOATING COMPANION BUTTONS
          ========================================== */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-40 flex flex-col gap-2">
        <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[#FF7A00] shadow-lg shadow-black/50 transition-all backdrop-blur-md">
          <Headphones className="w-5 h-5" />
        </button>
        {showScrollTop && (
          <button 
            onClick={handleScrollToTop}
            className="p-3 bg-[#FF7A00] text-black hover:scale-105 rounded-full shadow-lg shadow-[#FF7A00]/25 transition-all"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

    </div>
  );
}