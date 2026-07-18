import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';


import WelcomePage from '../features/discovery/pages/WelcomePage';

import PageTransition from '../components/motion/PageTransition';



import PlaceholderPremiumPage from '../pages/premium/PlaceholderPremiumPage';
import LoginShell from '../pages/premium/pages/LoginShell';
import RegisterShell from '../pages/premium/pages/RegisterShell';
import OtpShell from '../pages/premium/pages/OtpShell';
import ForgotPasswordShell from '../pages/premium/pages/ForgotPasswordShell';
import ResetPasswordShell from '../pages/premium/pages/ResetPasswordShell';



const LazyHomePage = lazy(() => import('../features/discovery/pages/Home/homepage.jsx'));

const LazyRestaurantListingPage = lazy(() => import('../features/catalog/pages/RestaurantListingPage'));

const LazyRestaurantDetailShell = lazy(() => import('../pages/premium/pages/RestaurantDetailShell'));
const LazyFoodItemDetailShell = lazy(() => import('../pages/premium/pages/FoodItemDetailShell'));
const LazySearchResultsShell = lazy(() => import('../pages/premium/pages/SearchResultsShell'));
const LazyCategoriesShell = lazy(() => import('../pages/premium/pages/CategoriesShell'));
const LazyOffersDealsShell = lazy(() => import('../pages/premium/pages/OffersDealsShell'));
const LazyWishlistShell = lazy(() => import('../pages/premium/pages/WishlistShell'));
const LazyShoppingCartShell = lazy(() => import('../pages/premium/pages/ShoppingCartShell'));
const LazyCheckoutShell = lazy(() => import('../pages/premium/pages/CheckoutShell'));
const LazyOrderSuccessShell = lazy(() => import('../pages/premium/pages/OrderSuccessShell'));
const LazyOrderTrackingShell = lazy(() => import('../pages/premium/pages/OrderTrackingShell'));
const LazyOrderHistoryShell = lazy(() => import('../pages/premium/pages/OrderHistoryShell'));
const LazyUserProfileShell = lazy(() => import('../pages/premium/pages/UserProfileShell'));
const LazySavedAddressesShell = lazy(() => import('../pages/premium/pages/SavedAddressesShell'));
const LazyPaymentMethodsShell = lazy(() => import('../pages/premium/pages/PaymentMethodsShell'));
const LazyNotificationsShell = lazy(() => import('../pages/premium/pages/NotificationsShell'));
const LazyReviewsRatingsShell = lazy(() => import('../pages/premium/pages/ReviewsRatingsShell'));
const LazySettingsShell = lazy(() => import('../pages/premium/pages/SettingsShell'));
const LazyHelpSupportShell = lazy(() => import('../pages/premium/pages/HelpSupportShell'));
const LazyAboutUsShell = lazy(() => import('../pages/premium/pages/AboutUsShell'));
const LazyContactUsShell = lazy(() => import('../pages/premium/pages/ContactUsShell'));
const LazyPrivacyPolicyShell = lazy(() => import('../pages/premium/pages/PrivacyPolicyShell'));
const LazyTermsConditionsShell = lazy(() => import('../pages/premium/pages/TermsConditionsShell'));

const Custom404 = () => (
  <PlaceholderPremiumPage
    title="404"
    subtitle="The page you’re looking for doesn’t exist."
  />
);

const RouteSuspense = ({ children }) => (
  <Suspense fallback={<div className="min-h-[60vh] w-full flex items-center justify-center text-gray-400">Loading...</div>}>
    {children}
  </Suspense>
);

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<WelcomePage />} />



        <Route
          path="/home"
          element={
            <RouteSuspense>
              <LazyHomePage />
            </RouteSuspense>
          }
        />

        {/* Discovery */}
        <Route
          path="/restaurants"
          element={
            <RouteSuspense>
              <LazyRestaurantListingPage />
            </RouteSuspense>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <RouteSuspense>
              <LazyRestaurantDetailShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/dish/:id"
          element={
            <RouteSuspense>
              <LazyFoodItemDetailShell />
            </RouteSuspense>
          }
        />

        <Route
          path="/search"
          element={
            <RouteSuspense>
              <LazySearchResultsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/categories"
          element={
            <RouteSuspense>
              <LazyCategoriesShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/offers"
          element={
            <RouteSuspense>
              <LazyOffersDealsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RouteSuspense>
              <LazyWishlistShell />
            </RouteSuspense>
          }
        />

        {/* Checkout */}
        <Route
          path="/cart"
          element={
            <RouteSuspense>
              <LazyShoppingCartShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <RouteSuspense>
              <LazyCheckoutShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/order/success"
          element={
            <RouteSuspense>
              <LazyOrderSuccessShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <RouteSuspense>
              <LazyOrderTrackingShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/orders"
          element={
            <RouteSuspense>
              <LazyOrderHistoryShell />
            </RouteSuspense>
          }
        />

        {/* Account */}
        <Route
          path="/profile"
          element={
            <RouteSuspense>
              <LazyUserProfileShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/addresses"
          element={
            <RouteSuspense>
              <LazySavedAddressesShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/payment-methods"
          element={
            <RouteSuspense>
              <LazyPaymentMethodsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/notifications"
          element={
            <RouteSuspense>
              <LazyNotificationsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/reviews"
          element={
            <RouteSuspense>
              <LazyReviewsRatingsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/settings"
          element={
            <RouteSuspense>
              <LazySettingsShell />
            </RouteSuspense>
          }
        />

        {/* Support & Policies */}
        <Route
          path="/help"
          element={
            <RouteSuspense>
              <LazyHelpSupportShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/about"
          element={
            <RouteSuspense>
              <LazyAboutUsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/contact"
          element={
            <RouteSuspense>
              <LazyContactUsShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <RouteSuspense>
              <LazyPrivacyPolicyShell />
            </RouteSuspense>
          }
        />
        <Route
          path="/terms"
          element={
            <RouteSuspense>
              <LazyTermsConditionsShell />
            </RouteSuspense>
          }
        />

        {/* Authentication pages (backend-wired) */}
        <Route
          path="/login"
          element={<LoginShell />}
        />
        <Route
          path="/register"
          element={<RegisterShell />}
        />
        <Route
          path="/otp"
          element={<OtpShell />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordShell />}
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordShell />}
        />

        <Route path="*" element={<Custom404 />} />
      </Routes>
    </PageTransition>
  );
};

export default AppRoutes;



