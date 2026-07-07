import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { ArrowLeft, Star, ShoppingBag, Clock } from 'lucide-react';

const MOCK_DETAILS = {
  '1': { name: 'Le Chic Bistro', cuisine: 'Fine Dining', rating: 4.9, time: '20-30 min', priceRange: '$$$', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', menu: [
    { id: 'm1', name: 'Truffle Filet Mignon', price: 45, desc: 'Prime beef tenderloin, shaved black truffles, red wine reduction.' },
    { id: 'm2', name: 'Lobster Thermidor', price: 52, desc: 'Atlantic lobster tail, cognac cream sauce, Gruyère crust.' }
  ]},
  '2': { name: 'Green Garden Cafe', cuisine: 'Healthy Options', rating: 4.5, time: '10-20 min', priceRange: '$$', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200', menu: [
    { id: 'm3', name: 'Avocado Crunch Bowl', price: 16, desc: 'Organic quinoa, whipped avocado, heirloom tomatoes, hemp seeds.' },
    { id: 'm4', name: 'Acai Berry Elixir', price: 9, desc: 'Pure amazon acai, wild berries, homemade almond butter.' }
  ]},
  '3': { name: 'Ninja Sushi Bar', cuisine: 'Sushi', rating: 4.7, time: '15-25 min', priceRange: '$$', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200', menu: [
    { id: 'm5', name: 'Dragon Roll Supreme', price: 22, desc: 'Eel, cucumber topped with avocado, tobiko, and unagi glaze.' },
    { id: 'm6', name: 'Omakase Nigiri Set', price: 38, desc: 'Chef’s daily selection of 8 premium fresh catch pieces.' }
  ]},
  '4': { name: 'The Flame Grill', cuisine: 'Fast Food', rating: 4.2, time: '15-25 min', priceRange: '$', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200', menu: [
    { id: 'm7', name: 'Double Smash Smokehouse', price: 14, desc: 'Angus beef, applewood bacon, sharp cheddar, signature BBQ sauce.' },
    { id: 'm8', name: 'Truffle Parmesan Fries', price: 6, desc: 'Hand-cut russet potatoes tossed in white truffle oil.' }
  ]}
};

const DetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const merchant = MOCK_DETAILS[id];

  if (!merchant) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <p className="text-gray-400">Merchant details could not be resolved.</p>
        <button onClick={() => navigate('/home')} className="mt-4 text-[#D33F0F] font-bold flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* Top Graphic Splash Section Hero Banner */}
      <div className="relative h-80 w-full overflow-hidden">
        <img src={merchant.image} alt={merchant.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50" />
        
        {/* Absolute Floating Navigation Back Trigger Link */}
        <button 
          onClick={() => navigate('/home')}
          className="absolute top-8 left-8 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:bg-[#D33F0F] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Main Core Profile Information Header Cards Overlay */}
      <div className="max-w-5xl mx-auto px-8 -mt-24 relative z-10">
        <div className="bg-[#141414] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-orange-950/40 text-[#D33F0F] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-4 inline-block border border-orange-900/30 uppercase">
              {merchant.cuisine}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">{merchant.name}</h1>
            
            <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-wider mt-4">
              <span>{merchant.priceRange}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="flex items-center gap-1.5"><Clock size={14} /> {merchant.time}</span>
            </div>
          </div>

          <div className="bg-white text-black px-5 py-2.5 rounded-2xl flex items-center gap-2 font-black text-xl shadow-lg self-start md:self-auto">
            <Star size={20} className="fill-[#D33F0F] text-[#D33F0F]" />
            <span>{merchant.rating}</span>
          </div>
        </div>

        {/* Menu Grid Items Layout Structure */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-2">Featured Menu</h3>
          <p className="text-gray-500 mb-10">Fresh ingredients prepared at <span className="text-[#D33F0F] italic font-serif">warp speed.</span></p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {merchant.menu.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-md group hover:border-white/10 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-xl text-white group-hover:text-[#D33F0F] transition-colors">{item.name}</h4>
                    <span className="text-xl font-black text-[#D33F0F]">${item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{item.desc}</p>
                </div>

                <button 
                  onClick={() => addToCart(item, { id: id, name: merchant.name })}
                  className="mt-8 w-full h-12 rounded-full bg-white/10 border border-white/10 hover:bg-[#D33F0F] hover:border-[#D33F0F] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;