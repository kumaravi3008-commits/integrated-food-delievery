import { Search, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 lg:px-20 py-8 bg-white/10 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="text-2xl font-bold text-white tracking-tighter">
        Dine<span className="text-orange-600">Express</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
        <a href="#" className="hover:text-white transition-colors">Discover</a>
        <a href="#" className="hover:text-white transition-colors">Restaurants</a>
        <a href="#" className="hover:text-white transition-colors">Orders</a>
        <a href="#" className="hover:text-white transition-colors">Offers</a>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4 text-white">

        <Search size={20} className="cursor-pointer hover:text-orange-500 transition-colors" />
        <div className="relative cursor-pointer group">
          <ShoppingBag size={20} className="group-hover:text-orange-500 transition-colors" />
          <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
        </div>

        {/* Login Button */}
        <button className="ml-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">
          Login
        </button>

      </div>
    </nav>
  );
};

export default Navbar;