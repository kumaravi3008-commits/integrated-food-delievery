import { Search, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 lg:px-20 py-6 sm:py-8 bg-white/10 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <Link to="/home" className="text-2xl font-bold text-white tracking-tighter">
        Dine<span className="text-orange-600">Express</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
        <Link to="/home" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/restaurants" className="hover:text-white transition-colors">
          Restaurants
        </Link>
        <Link to="/orders" className="hover:text-white transition-colors">
          Orders
        </Link>
        <Link to="/offers" className="hover:text-white transition-colors">
          Offers
        </Link>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-6 text-white">
        <button
          type="button"
          onClick={() => navigate('/search')}
          aria-label="Search"
          className="cursor-pointer"
        >
          <Search size={20} className="hover:text-orange-500 transition-colors" />
        </button>

        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate('/cart')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigate('/cart');
          }}
          className="relative cursor-pointer group"
          aria-label="Cart"
        >
          <ShoppingBag size={20} className="group-hover:text-orange-500 transition-colors" />
          <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="min-w-[90px] h-9 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 text-white text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors flex items-center justify-center px-4"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
