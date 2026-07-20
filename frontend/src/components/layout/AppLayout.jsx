import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import CartDrawer from '../../features/checkout-cart/components/CartDrawer';
import Footer from './Footer/Footer';

export default function AppLayout({ showFooter = false, children }) {
  return (
<div className="w-full min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <AppNavbar />
      <main className="flex-1 w-full">{children || <Outlet />}</main>
      <CartDrawer />
      {showFooter && <Footer />}
    </div>
  );
}
