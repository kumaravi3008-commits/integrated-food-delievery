import MarketingLayout from './MarketingLayout';
import AuthLayout from './AuthLayout';
import RestaurantLayout from './RestaurantLayout';
import DashboardLayout from './DashboardLayout';
import CheckoutLayout from './CheckoutLayout';

/**
 * Central mapping for purpose-specific layout selection.
 * Use this to avoid pages all manually selecting wrappers.
 */
export default function LayoutProvider({ purpose, children, ...rest }) {
  switch (purpose) {
    case 'marketing':
      return <MarketingLayout {...rest}>{children}</MarketingLayout>;
    case 'auth':
      return <AuthLayout {...rest}>{children}</AuthLayout>;
    case 'restaurant':
      return <RestaurantLayout {...rest}>{children}</RestaurantLayout>;
    case 'dashboard':
      return <DashboardLayout {...rest}>{children}</DashboardLayout>;
    case 'checkout':
      return <CheckoutLayout {...rest}>{children}</CheckoutLayout>;
    default:
      return <div>{children}</div>;
  }
}

