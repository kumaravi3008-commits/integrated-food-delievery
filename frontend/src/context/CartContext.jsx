import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  selectCartItemCount,
  selectCartOpen,
  openCart,
  closeCart,
  toggleCart,
  addItemToCart,
  removeCartItem,
  updateCartQuantity,
} from '../redux/slices/cartSlice';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const itemCount = useSelector(selectCartItemCount);
  const isOpen = useSelector(selectCartOpen);

  const value = {
    cart,
    itemCount,
    isOpen,
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
    toggleCart: () => dispatch(toggleCart()),
    addItem: (payload) => dispatch(addItemToCart(payload)),
    removeItem: (menuItemId) => dispatch(removeCartItem(menuItemId)),
    updateQuantity: (payload) => dispatch(updateCartQuantity(payload)),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

export default CartContext;

