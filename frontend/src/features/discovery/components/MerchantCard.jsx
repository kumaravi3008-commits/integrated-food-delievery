import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const MerchantCard = ({ merchant }) => {
  const { id, name, image, cuisine, rating, deliveryTime, priceRange } = merchant;
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/restaurant/${id}`)}
      className="bg-white rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between"
    >
      <div>
        {/* Top Media/Thumbnail Section */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Top-Right Pill Rating Tracker */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-black text-black">
            <Star size={14} className="fill-orange-500 text-orange-500" /> 
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Text Details Area */}
        <div className="p-6">
          <h4 className="text-xl font-bold mb-2 group-hover:text-[#D33F0F] transition-colors line-clamp-1">
            {name}
          </h4>
          <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-wider flex-wrap">
            <span>{priceRange || '$$'} • {cuisine}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {deliveryTime || '15-25'} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantCard;