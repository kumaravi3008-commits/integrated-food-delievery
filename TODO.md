# Project Integration TODO (MERN Production-Ready)

## Phase 1 — Backend routing completeness (required for end-to-end)
- [ ] Inspect backend/src/app.js to list all registered route modules.
- [ ] Verify existence of each referenced backend route module.
- [ ] Create missing backend route files + controllers + models needed by existing app.js registration.
- [ ] Implement/adjust core API endpoints expected by the frontend services:
  - [ ] Auth: /api/auth/register, /api/auth/login, /api/auth/reset-password, /api/auth/profile
  - [ ] Restaurants: /api/restaurants, /api/restaurants/nearby, /api/restaurants/:id
  - [ ] Menus: /api/restaurants/:id/menus
  - [ ] Reviews: /api/restaurants/:id/reviews
  - [ ] Categories, Search, Cart, Checkout, Orders, Wishlist, Notifications, Favorites, etc (as discovered).
- [ ] Standardize response shape: { success, data, message }.
- [ ] Standardize error handling + status codes.

## Phase 2 — Frontend route/API wiring
- [ ] Audit frontend routing (frontend/src/routes/AppRoutes.jsx) vs existing pages.
- [ ] Fix missing/incorrect imports and duplicate routes.
- [ ] Audit frontend services/apiClient/axios interceptors for token handling.
- [ ] Replace mocks/static data with real API integration.

## Phase 3 — Authentication hardening
- [ ] Ensure ProtectedRoute uses correct auth state restoration.
- [ ] Add refresh token + session restoration if applicable.
- [ ] Implement OTP verification flow if backend supports it; otherwise align frontend with current backend auth.
- [ ] Role-based access control enforcement across protected pages.

## Phase 4 — End-to-end verification
- [ ] Flow 1: Register → OTP → Login
- [ ] Flow 2: Browse Restaurants
- [ ] Flow 3: Search Food
- [ ] Flow 4: Restaurant Details
- [ ] Flow 5: Add to Cart
- [ ] Flow 6: Update Cart
- [ ] Flow 7: Checkout
- [ ] Flow 8: Place Order
- [ ] Flow 9: Order History
- [ ] Flow 10: Track Orders
- [ ] Flow 11: Update Profile
- [ ] Flow 12: Logout → Login Again

## Phase 5 — Audit cleanup
- [ ] Remove broken frontend routes.
- [ ] Remove duplicate/unused code.
- [ ] Fix console/runtime/network errors.
- [ ] Confirm build warnings that affect functionality are resolved.

