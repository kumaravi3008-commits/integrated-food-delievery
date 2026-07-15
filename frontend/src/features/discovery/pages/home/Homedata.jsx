import {
  Truck,
  CalendarCheck,
  Navigation,
  ShieldCheck,
  Lock,
  Headphones,
  Pizza,
  Sandwich,
  Soup,
  Utensils,
  CookingPot,
  IceCream2,
  Salad,
  Fish,
} from "lucide-react";

export const FEATURES = [
  {
    id: "fast-delivery",
    icon: Truck,
    title: "Fast delivery",
    desc: "Real-time courier routing gets hot food to your door in 22 minutes on average.",
  },
  {
    id: "table-booking",
    icon: CalendarCheck,
    title: "Table booking",
    desc: "Reserve a verified table at top restaurants in under a minute, no phone calls.",
  },
  {
    id: "live-tracking",
    icon: Navigation,
    title: "Live order tracking",
    desc: "Watch your rider move on the map from kitchen to your doorstep, second by second.",
  },
  {
    id: "verified-restaurants",
    icon: ShieldCheck,
    title: "Verified restaurants",
    desc: "Every partner kitchen passes a hygiene and quality audit before it goes live.",
  },
  {
    id: "secure-payments",
    icon: Lock,
    title: "Secure payments",
    desc: "Card, UPI, and wallet checkout protected with bank-grade encryption.",
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 support",
    desc: "A real human picks up in under 90 seconds, day or night, for any order issue.",
  },
];

export const RESTAURANTS = [
  {
    id: 1,
    name: "The Golden Fork",
    cuisine: "Italian, Continental",
    rating: 4.8,
    time: "20-30 min",
    distance: "1.5 km",
    offer: "20% OFF",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Spice Symphony",
    cuisine: "North Indian, Mughlai",
    rating: 4.6,
    time: "35-45 min",
    distance: "2.8 km",
    offer: "Free delivery",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Dragon Wok Lounge",
    cuisine: "Chinese, Asian",
    rating: 4.4,
    time: "15-25 min",
    distance: "0.9 km",
    offer: "Buy 1 Get 1",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Basil & Vine",
    cuisine: "Mediterranean",
    rating: 4.7,
    time: "25-35 min",
    distance: "3.2 km",
    offer: "15% OFF",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Coastal Catch",
    cuisine: "Seafood, Grill",
    rating: 4.5,
    time: "30-40 min",
    distance: "4.1 km",
    offer: "Flat ₹150 OFF",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Sakura House",
    cuisine: "Japanese, Sushi",
    rating: 4.9,
    time: "25-30 min",
    distance: "2.2 km",
    offer: "New: 25% OFF",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Southern Comfort",
    cuisine: "South Indian",
    rating: 4.6,
    time: "18-28 min",
    distance: "1.1 km",
    offer: "10% OFF",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Sweet Nothings",
    cuisine: "Desserts, Bakery",
    rating: 4.8,
    time: "15-20 min",
    distance: "1.8 km",
    offer: "Free topping",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
  },
];

export const CATEGORIES = [
  { id: 1, name: "Pizza", icon: Pizza },
  { id: 2, name: "Burger", icon: Sandwich },
  { id: 3, name: "Biryani", icon: Soup },
  { id: 4, name: "South Indian", icon: Utensils },
  { id: 5, name: "Chinese", icon: CookingPot },
  { id: 6, name: "Desserts", icon: IceCream2 },
  { id: 7, name: "Healthy", icon: Salad },
  { id: 8, name: "Seafood", icon: Fish },
];

export const STEPS = [
  {
    id: 1,
    title: "Choose restaurant",
    desc: "Browse verified kitchens near you, filtered by cuisine, rating, or dietary need.",
  },
  {
    id: 2,
    title: "Order food",
    desc: "Customize your dish, apply an offer, and check out with saved payment methods.",
  },
  {
    id: 3,
    title: "Enjoy delivery",
    desc: "Track your rider live and get notified the moment your food is at the door.",
  },
];

export const STATS = [
  { id: 1, value: 10000, suffix: "+", label: "Restaurants" },
  { id: 2, value: 500000, suffix: "+", label: "Happy customers" },
  { id: 3, value: 50, suffix: "+", label: "Cities" },
  { id: 4, value: 1000000, suffix: "+", label: "Orders delivered" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Food critic",
    rating: 5,
    comment:
      "The live tracking is uncannily accurate. I've timed my elevator ride down to the lobby around it.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    role: "Verified user",
    rating: 5,
    comment:
      "Booked a table for eight on a Friday night in under a minute. No calls, no waiting on hold.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Regular diner",
    rating: 4,
    comment:
      "Every restaurant on here actually matches its photos. That alone earned my repeat business.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Kabir Anand",
    role: "Verified user",
    rating: 5,
    comment:
      "Support picked up in under a minute when my order went to the wrong gate. Refunded on the spot.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];