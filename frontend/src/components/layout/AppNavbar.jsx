import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Search, ShoppingBag, X, Gift } from 'lucide-react';
import { logout, selectAuth, selectIsAuthenticated } from '../../redux/slices/authSlice';
import {
  fetchCart,
  openCart,
  selectCartItemCount,
} from '../../redux/slices/cartSlice';
import Button from '../ui/Button';

const linkClass = ({ isActive }) =>
  `hover:text-white transition-colors ${isActive ? 'text-white' : 'text-white/70'}`;

export default function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartCount = useSelector(selectCartItemCount);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCart());
  }, [dispatch, isAuthenticated]);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login?next=/restaurants');
      return;
    }
    dispatch(openCart());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 lg:px-20 py-5 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <Link to="/home" className="text-2xl font-bold text-white tracking-tighter">
        Dine<span className="text-[#FF7A00]">Express</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        <NavLink to="/home" className={linkClass}>
          Discover
        </NavLink>
        <NavLink to="/restaurants" className={linkClass}>
          Restaurants
        </NavLink>
        <NavLink to="/orders" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/rewards" className={linkClass}>
          Rewards
        </NavLink>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 text-white">
        <Link
          to="/restaurants"
          className="hidden sm:inline-flex"
          aria-label="Search restaurants"
        >
          <Search size={20} className="hover:text-[#FF7A00] transition-colors" />
        </Link>

        <button
          type="button"
          onClick={handleCartClick}
          className="relative cursor-pointer group"
          aria-label="Open cart"
        >
          <ShoppingBag size={20} className="group-hover:text-[#FF7A00] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF7A00] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>

        <Link
          to="/rewards"
          className="hidden sm:inline-flex hover:text-[#FF7A00] transition-colors"
          aria-label="Rewards"
        >
          <Gift size={20} />
        </Link>

        {isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 max-w-[120px] truncate">
              {user?.email}
            </span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}

        <button
          type="button"
          className="md:hidden p-1"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-[#2A2A2A] px-6 py-6 flex flex-col gap-4 md:hidden">
          <NavLink to="/home" onClick={() => setMobileOpen(false)} className={linkClass}>
            Discover
          </NavLink>
          <NavLink to="/restaurants" onClick={() => setMobileOpen(false)} className={linkClass}>
            Restaurants
          </NavLink>
          <NavLink to="/orders" onClick={() => setMobileOpen(false)} className={linkClass}>
            Orders
          </NavLink>
          <NavLink to="/rewards" onClick={() => setMobileOpen(false)} className={linkClass}>
            Rewards
          </NavLink>
          {isAuthenticated ? (
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button size="sm" onClick={() => { setMobileOpen(false); navigate('/login'); }}>
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
