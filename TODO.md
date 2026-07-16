# DineExpress - Frontend Backend Connectivity TODO

## Step 1: Audit & map APIs
- [x] Inspect existing routing (`frontend/src/routes/AppRoutes.jsx`) and global axios auth behavior.
- [x] Inspect discovery/catalog pages for mock data and placeholder calls.
- [ ] Inspect premium Shell pages for disconnected UI / dummy/mock usage.
- [ ] Inspect cart/checkout/order/profile/wishlist implementations for backend wiring.

## Step 2: Discovery / Home / Restaurants
- [ ] Connect Restaurant listing to backend (`frontend/src/services/discoveryService.js`).
- [ ] Connect restaurant card navigation (and ensure RestaurantDetailShell uses menus API).
- [ ] Remove/replace `mockRestaurants` usage.

## Step 3: Food detail, customization, cart
- [ ] Replace placeholder FoodDetailPage logic with backend integration.
- [ ] Wire “Add to Cart” to Redux/cartService endpoints.
- [ ] Ensure cart drawer/badge updates from Redux.

## Step 4: Search
- [ ] Implement live search using backend endpoints.
- [ ] Ensure `/search` page shows loading/empty/error and supports retry.

## Step 5: Location-based nearby
- [ ] Wire current location button using `useGeolocation`.
- [ ] Call nearby restaurants/offers APIs based on lat/lng.
- [ ] Implement manual location selection + persistence if permission denied (connect existing UI).

## Step 6: Navbar/Footer + auth state
- [ ] Replace navbar static links/badges with correct React Router routes and Redux-driven cart/auth state.
- [ ] Ensure logout/login flows update authentication state.

## Step 7: Checkout & Orders end-to-end
- [ ] Wire cart -> checkout -> place order -> success.
- [ ] Wire order history and tracking pages.
- [ ] Ensure rate/review hooks exist and connect (if backend provides endpoints).

## Step 8: Final validation
- [ ] Run lint + dev server.
- [ ] Verify the full journey: Welcome → Login → Home → Location → Search → Restaurant → Menu → Food Detail → Cart → Checkout → Place Order → Success → Track → Profile → Logout.

