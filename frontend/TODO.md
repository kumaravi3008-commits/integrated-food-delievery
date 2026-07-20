# Implementation Tasks — COMPLETED ✅

## ✅ Step 1: Update `Homedata.jsx` — Fix data to match exact spec
- Changed IDs from numbers to strings (`1` → `"1"`, etc.)
- Added `type` field (`"delivery"` / `"dine-in"`) per spec
- Fixed image URLs to match provided URLs exactly
- Fixed Sakura House offer: `"New: 25% OFF"` → `"Now 25% OFF"`
- Updated images for Spice Symphony, Dragon Wok Lounge, Southern Comfort, Sweet Nothings

## ✅ Step 2: Update `PopularRestaurants.jsx` — Accept filter prop
- Added `filterType` prop (defaults to `"all"`)
- Uses `useMemo` to filter RESTAURANTS array by `type` when prop is not `"all"`
- Updated `.map()` to iterate over `filteredRestaurants`
- All existing UI/styling/navigation kept intact

## ✅ Step 3: Update `homepage.jsx` — Connect Hero toggles to PopularRestaurants
- Added `searchMode` state lifted to `homepage.jsx`
- Conversion logic: `"order"` → `"delivery"` filter, `"explore"` → `"all"`
- Passed `searchMode` and `setSearchMode` as props to Hero
- Passed `filterType={restaurantFilter}` to PopularRestaurants

## ✅ Step 4: Update `Hero.jsx` — Accept props from parent
- Changed to accept `searchMode` and `setSearchMode` as props (removed internal state)
- Removed local `useState` for `searchMode`

## ✅ Step 5: Create backend seed file
- Created `backend/src/seed/restaurants.js` with all 8 restaurants
- Each restaurant has name, cuisine array, rating, etaMins, priceTier, isOpen, image, address, location, and menu items
- Uses upsert pattern (creates if new, updates if existing)

