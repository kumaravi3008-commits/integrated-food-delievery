import { Link } from 'react-router-dom';

export default function MerchantCard({ item }) {
  // Use a fallback ID if your mock data doesn't have one yet for testing
  const itemId = item?.id || "dish-101"; 

  return (
    <Link to={`/dish/${itemId}`} className="block group">
      {/* Your premium card UI layout goes here */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all group-hover:border-[#FF7A00]/50">
        <img src={item?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"} alt="Food" className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="p-4">
          <h3 className="text-white font-bold group-hover:text-[#FF7A00] transition-colors">
            {item?.name || "Smoked Truffle Butter Glazed Burger"}
          </h3>
          <p className="text-[#FF7A00] font-black mt-1">₹{item?.price || "429"}</p>
        </div>
      </div>
    </Link>
  );
}
