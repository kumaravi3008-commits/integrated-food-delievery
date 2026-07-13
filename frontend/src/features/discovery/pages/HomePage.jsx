import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Map,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
  ChevronRight,
  Zap,
  Calendar,
  Award,
  Utensils,
} from "lucide-react";
import Navbar from  '../../../components/layout/Navbar/Navbar'
import Footer from '../../../components/layout/Footer/Footer'
// --- PRODUCTION MOCK DATA STRUCTURES ---
const CUISINES = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Indian", icon: "🍛" },
  { id: 4, name: "Chinese", icon: "🥢" },
  { id: 5, name: "Italian", icon: "🍝" },
  { id: 6, name: "Desserts", icon: "🍰" },
  { id: 7, name: "Coffee", icon: "☕" },
  { id: 8, name: "Healthy", icon: "🥗" },
  { id: 9, name: "Seafood", icon: "🍤" },
  { id: 10, name: "Drinks", icon: "🍹" },
];

const TRENDING_RESTAURANTS = [
  {
    id: 1,
    name: "The Golden Fork Luxury Dining",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    cuisine: "Italian, Continental, Fusion",
    time: "20-30 min",
    distance: "1.5 km",
    offer: "20% OFF up to ₹100",
    isOpen: true,
  },
  {
    id: 2,
    name: "Spice Symphony Bistro",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    cuisine: "North Indian, Mughlai Fine Arts",
    time: "35-45 min",
    distance: "2.8 km",
    offer: "Free Delivery over ₹300",
    isOpen: true,
  },
  {
    id: 3,
    name: "Dragon Wok Lounge",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    cuisine: "Chinese, Authentic Asian",
    time: "15-25 min",
    distance: "0.9 km",
    offer: "Buy 1 Get 1 Free",
    isOpen: false,
  },
];

const OFFERS = [
  {
    id: 1,
    title: "Super Saver Delivery",
    desc: "Get 50% off on your first 3 food deliveries.",
    code: "DINEFIRST50",
    bg: "from-orange-950 to-neutral-950",
  },
  {
    id: 2,
    title: "Premium Dine-Out Perks",
    desc: "Complimentary desserts + 15% off at structural fine dines.",
    code: "LUXURYDINING",
    bg: "from-amber-950 to-neutral-950",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Food Critic",
    comment:
      "DineExpress completely revolutionized how I book fine dines. The live seat configuration mapping is spot on!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    role: "Verified User",
    comment:
      "Ultra-fast home delivery matrix. The food arrived steaming hot within 18 minutes. Highly recommended!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
];

export default function DineExpressHomePage() {
  const [searchMode, setSearchMode] = useState("delivery");
  const [likedStores, setLikedStores] = useState([]);

  const handleLikeToggle = (id) => {
    setLikedStores((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // --- STAGGER CONTROLS ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
    <Navbar />
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden font-sans selection:bg-[#D33F0F] selection:text-white antialiased">
      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-[#111111] flex items-center justify-center min-h-[90vh] py-12"
      >
        {/* Dynamic Radially Centered Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-[#D33F0F]/10 rounded-full blur-[130px] pointer-events-none z-0" />

        {/* Ambient Organic Floating Elements */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[22%] text-3xl opacity-30 select-none pointer-events-none hidden lg:block"
        >
          🍃
        </motion.div>
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [0, -12, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="absolute right-[12%] top-[18%] text-4xl opacity-40 select-none pointer-events-none hidden lg:block"
        >
          🍅
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute left-[8%] bottom-[28%] text-4xl opacity-35 select-none pointer-events-none hidden lg:block"
        >
          🌶️
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute right-[10%] bottom-[22%] text-3xl opacity-25 select-none pointer-events-none hidden lg:block"
        >
          🍃
        </motion.div>

        {/* Master Center Constraints Wrapper */}
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full space-y-6 flex flex-col items-center"
          >
            {/* Top Micro-pill Badge */}
            <motion.div variants={staggerItem}>
              <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#2A2A2A] px-4 py-1.5 rounded-full text-[11px] sm:text-xs text-[#FF6B35] font-semibold tracking-wide shadow-inner">
                <Zap className="w-3.5 h-3.5 text-[#D33F0F]" /> Integrated
                Logistics & Fine Dining Reservations
              </div>
            </motion.div>

            {/* Structural Header Layout */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] w-full mt-4"
            >
              Flavors Delivered.
              <br />
              <span className="bg-gradient-to-r from-[#D33F0F] to-[#FF6B35] bg-clip-text text-transparent">
                Tables Reserved.
              </span>
            </motion.h1>

            {/* Paragraph Text Block */}
            <motion.p
              variants={staggerItem}
              className="text-gray-700 text-sm sm:text-base md:text-lg max-w-xl font-serif italic tracking-wide leading-relaxed antialiased opacity-90"
            >
              Experience zero-latency hyper-local delivery or unlock automated
              premium seating validation protocols at the city’s top-tier fine
              dines.
            </motion.p>

            {/* Toggle Modes Control Block */}
            <motion.div
              variants={staggerItem}
              className="bg-[#111111] p-2.5 rounded-xl border border-[#2A2A2A] inline-flex w-full max-w-[340px] gap-1.5 shadow-md"
            >
              <button
                onClick={() => setSearchMode("delivery")}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${searchMode === "delivery" ? "bg-[#D33F0F] text-white shadow-sm" : "text-[#A3A3A3] hover:text-white"}`}
              >
                Food Delivery
              </button>
              <button
                onClick={() => setSearchMode("dineout")}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${searchMode === "dineout" ? "bg-[#D33F0F] text-white shadow-sm" : "text-[#A3A3A3] hover:text-white"}`}
              >
                Reserve Table
              </button>
            </motion.div>

            {/* Formatted Search Module */}
            <motion.div
              variants={staggerItem}
              className="bg-[#111111] border border-[#2A2A2A] p-3.5 rounded-2xl flex flex-col sm:flex-row items-center gap-3 shadow-2xl w-full max-w-2xl text-left"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#2A2A2A] w-full sm:w-[38%]">
                <MapPin className="text-[#D33F0F] h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Your location..."
                  className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 text-white placeholder-neutral-600"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 w-full sm:flex-1">
                <Search className="text-[#A3A3A3] h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder={
                    searchMode === "delivery"
                      ? "Search dishes, cuisines..."
                      : "Search fine dining, cafes..."
                  }
                  className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 text-white placeholder-neutral-600"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#D33F0F] hover:bg-[#FF6B35] text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto shrink-0"
              >
                Search
              </motion.button>
            </motion.div>

            {/* Micro Metrics Module with Contextual Badging */}
            <motion.div
              variants={staggerItem}
              className="flex flex-row items-center justify-center gap-6 sm:gap-12 pt-3 w-full max-w-lg"
            >
              {[
                {
                  metric: "550+",
                  label: "Lounges",
                  icon: <Utensils className="w-3.5 h-3.5 text-[#D33F0F]" />,
                },
                {
                  metric: "18 min",
                  label: "Avg ETA",
                  icon: <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />,
                },
                {
                  metric: "4.9/5",
                  label: "Rating",
                  icon: (
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ),
                },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="bg-[#111111] border border-[#2A2A2A] p-2 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-black text-white tracking-tight leading-none">
                      {stat.metric}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#A3A3A3] mt-0.5 whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Showcase Visual Assets Block with Inner Highlighting Glows */}
            <motion.div
              variants={staggerItem}
              className="w-full max-w-xl sm:max-w-2xl pt-4 relative group"
            >
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-[#2A2A2A] shadow-[0_0_60px_rgba(211,63,15,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80"
                  alt="Featured Showcase Menu Item"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Showcase Micro Elements */}
                <div className="absolute top-4 left-4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#2A2A2A] px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                  <Clock className="text-[#FF6B35] w-3 h-3" />
                  <span className="text-[10px] font-bold tracking-wide">
                    Fast Routing
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#2A2A2A] px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                  <Star className="text-amber-400 w-3 h-3 fill-amber-400" />
                  <span className="text-[10px] font-bold tracking-wide">
                    Top Verified
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section id="categories" className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#D33F0F]">
                Curated Food
              </p>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                Explore Popular Categories
              </h2>
            </div>
            <button className="text-xs font-bold text-[#A3A3A3] hover:text-white flex items-center gap-0.5 transition-all group">
              See All{" "}
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4"
          >
            {CUISINES.map((cat) => (
              <motion.div
                key={cat.id}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  borderColor: "#D33F0F",
                  backgroundColor: "#0A0A0A",
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-all duration-300 shadow-sm"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-bold text-[#A3A3A3] group-hover:text-white">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. TRENDING RESTAURANTS */}
      <section id="restaurants" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D33F0F]">
              Highly Endorsed
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              Trending Establishments
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TRENDING_RESTAURANTS.map((res) => (
              <motion.div
                key={res.id}
                variants={staggerItem}
                whileHover={{ y: -6, borderColor: "#333333" }}
                className="bg-[#181818] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300"
              >
                <div className="relative h-48 bg-neutral-900 overflow-hidden">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#FF6B35] border border-[#2A2A2A]">
                    {res.offer}
                  </div>
                  <button
                    onClick={() => handleLikeToggle(res.id)}
                    className="absolute top-3 right-3 p-2 bg-[#0A0A0A]/90 backdrop-blur-md rounded-lg text-[#A3A3A3] hover:text-rose-500 border border-[#2A2A2A] transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${likedStores.includes(res.id) ? "fill-rose-500 text-rose-500" : ""}`}
                    />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {res.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-[#111111] border border-[#2A2A2A] px-2 py-0.5 rounded text-[10px] text-amber-400 font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{" "}
                        {res.rating}
                      </div>
                    </div>
                    <p className="text-xs text-[#A3A3A3]">{res.cuisine}</p>

                    <div className="flex items-center justify-between border-t border-[#2A2A2A] mt-4 pt-3 text-[11px] text-[#A3A3A3]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D33F0F]" /> {res.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Map className="w-3 h-3" /> {res.distance}
                      </span>
                      <span
                        className={`font-bold ${res.isOpen ? "text-emerald-400" : "text-rose-500"}`}
                      >
                        {res.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button className="bg-[#111111] border border-[#2A2A2A] text-white text-xs font-bold py-2 rounded-lg hover:bg-neutral-800 transition-colors">
                      Delivery
                    </button>
                    <button className="bg-[#D33F0F] hover:bg-[#FF6B35] text-white text-xs font-bold py-2 rounded-lg transition-colors">
                      Book Table
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. TODAY'S OFFERS */}
      <section
        id="offers"
        className="py-16 bg-[#111111] border-y border-[#2A2A2A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-8">
            Today's Featured Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFERS.map((promo) => (
              <motion.div
                key={promo.id}
                whileHover={{ scale: 1.01 }}
                className={`bg-gradient-to-r ${promo.bg} border border-[#2A2A2A] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg`}
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] max-w-sm">
                    {promo.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="bg-[#0A0A0A] border border-dashed border-[#2A2A2A] px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#FF6B35]">
                    {promo.code}
                  </div>
                  <button className="text-xs font-bold text-white flex items-center gap-1 hover:text-[#FF6B35] transition-colors group">
                    Claim Offer{" "}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRUCTURAL VALUES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-12">
            High-Performance Ecosystem
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Truck className="w-4 h-4 text-[#D33F0F]" />,
                title: "Hyper-Fast Operations",
                desc: "Predictive logistical engines optimized to secure hot delivery turnarounds.",
              },
              {
                icon: <Calendar className="w-4 h-4 text-amber-500" />,
                title: "Validated Reservations",
                desc: "Real-time structural alignment with partner hosts guaranteeing instantly verified tables.",
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
                title: "Grade-A Sanitation",
                desc: "Strict regulatory health compliance checklists monitored across every storefront.",
              },
              {
                icon: <Award className="w-4 h-4 text-indigo-500" />,
                title: "Multi-Tier Privileges",
                desc: "Bespoke custom cashbacks and luxury hospitality rewards generated per transaction.",
              },
            ].map((prop, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="bg-[#111111] border border-[#2A2A2A] p-5 rounded-xl text-left space-y-3"
              >
                <div className="bg-[#181818] border border-[#2A2A2A] p-2.5 rounded-lg w-fit">
                  {prop.icon}
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {prop.title}
                </h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {prop.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>..

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-16 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-center mb-12">
            What the Critics Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#181818] border border-[#2A2A2A] p-6 rounded-2xl space-y-3 shadow-md"
              >
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <p className="text-[10px] text-[#A3A3A3]">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MOBILE APP PROMOTION */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Manage Your Cravings on the Go
          </h2>
          <p className="text-xs text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
            Download our upcoming standalone native app client to access
            instantaneous live order tracking and seamless table booking
            features.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button className="bg-[#111111] border border-[#2A2A2A] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:border-neutral-500 transition-colors">
              App Store
            </button>
            <button className="bg-[#111111] border border-[#2A2A2A] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:border-neutral-500 transition-colors">
              Google Play
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </>
    // ending of footer section 
  );
}

// starting of collection page 
