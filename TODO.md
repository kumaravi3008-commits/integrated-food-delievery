# Frontend Layout Refactor - DineExpress

## Step 1: Create purpose-specific layout wrappers (Phase 1)
- [x] Add `MarketingLayout.jsx`
- [x] Add `AuthLayout.jsx`
- [x] Add `RestaurantLayout.jsx`
- [x] Add `DashboardLayout.jsx`
- [x] Add `CheckoutLayout.jsx`


## Step 2: Fix Navbar/Footer container alignment
- [ ] Update `Navbar.jsx` to use shared container padding
- [ ] Update `Footer.jsx` to use shared container width + spacing

## Step 3: Update Home/Welcome to use MarketingLayout
- [ ] Refactor `features/discovery/pages/Home/homepage.jsx`
- [ ] Refactor `features/discovery/pages/WelcomePage.jsx`


## Step 4: Map premium shells to correct layout wrappers
- [ ] Update `PremiumPageShell.jsx` to delegate to new wrappers (or add mappings)
- [ ] Update auth shells (Login/Register/etc.) to AuthLayout
- [ ] Update dashboard shells to DashboardLayout
- [ ] Update checkout shells to CheckoutLayout

## Step 5: Landing page spacing/rhythm tuning
- [ ] Increase vertical rhythm between landing sections
- [ ] Normalize card/grid spacing and equal heights

## Step 6: Shopping & e-commerce layout tuning
- [ ] Restaurant listing/details/menu hierarchy + grid alignment
- [ ] Two-column checkout with sticky summary on desktop

## Step 7: Audit reusable components for adaptability
- [ ] Adjust `PremiumCard`, `Button`, `Input`, `Card` (spacing/width constraints)
- [ ] Ensure components don’t force generic paddings per page

## Step 8: Full page-by-page visual audit
- [ ] Verify: Home, Welcome, Discovery, Restaurant flows
- [ ] Verify: Auth, Cart/Checkout, Profile pages, Policies/Help
- [ ] Run final build/dev checks for layout regressions

