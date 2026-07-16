import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import CartDrawer from '../../features/checkout-cart/components/CartDrawer';

export default function AppLayout({ showFooter = false, children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <AppNavbar />
      <main className="flex-1 w-full">{children || <Outlet />}</main>
      <CartDrawer />
      {showFooter ? null : null}
    </div>
  );
}
