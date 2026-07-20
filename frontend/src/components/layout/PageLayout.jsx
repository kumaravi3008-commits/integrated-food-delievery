import { cn } from '../../utils/helpers';

/**
 * PageLayout
 * ==========
 * A lightweight layout system used across PremiumPageShell pages.
 * This file was missing in the repo; many pages import PageLayout.*
 * wrappers, so this restores the expected API without changing routing or business logic.
 */

const PageContainer = ({
  maxWidth = '3xl',
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-6 sm:px-8 lg:px-20',
        // Tailwind max-w mapping
        maxWidth === 'full' && 'max-w-full',
        maxWidth === 'lg' && 'max-w-layout-full',
        maxWidth === 'xl' && 'max-w-layout-full',
        maxWidth === '2xl' && 'max-w-3xl',
        maxWidth === '3xl' && 'max-w-3xl',
        maxWidth === '4xl' && 'max-w-4xl',
        className
      )}
    >
      {children}
    </div>
  );
};

const Centered = ({
  maxWidth = 'lg',
  children,
  className,
}) => {
  return (
    <div className={cn('w-full flex items-start justify-center', className)}>
      <PageContainer maxWidth={maxWidth} className="py-6 sm:py-10">
        {children}
      </PageContainer>
    </div>
  );
};

const Grid = ({
  cols = 3,
  gap = 6,
  className,
  children,
}) => {
  const gridCols =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : cols === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : cols === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  // Important: Tailwind can't reliably generate arbitrary dynamic classes.
  // Map known gap values to explicit Tailwind classes.
  const gapClass = (() => {
    switch (gap) {
      case 0:
        return 'gap-0';
      case 1:
        return 'gap-1';
      case 2:
        return 'gap-2';
      case 3:
        return 'gap-3';
      case 4:
        return 'gap-4';
      case 5:
        return 'gap-5';
      case 6:
        return 'gap-6';
      case 8:
        return 'gap-8';
      case 10:
        return 'gap-10';
      case 12:
        return 'gap-12';
      default:
        return 'gap-6';
    }
  })();

  return (
    <div className={cn('grid', gridCols, gapClass, className)}>
      {children}
    </div>
  );
};

const Header = ({
  title,
  subtitle,
  center = false,
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className={cn(center ? 'text-center' : 'text-left', 'space-y-2')}>
      {title ? (
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
      ) : null}
      {subtitle ? (
        <p className="text-sm sm:text-base text-white/70 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
};

const Auth = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const Detail = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const Content = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const Dashboard = ({ children }) => {
  return (
    <div className="relative">
      <PageContainer maxWidth="4xl" className="py-4 sm:py-6">
        {children}
      </PageContainer>
    </div>
  );
};

const Ecommerce = ({ children }) => {
  return (
    <div className="relative">
      <PageContainer maxWidth="6xl" className="py-4 sm:py-6">
        {children}
      </PageContainer>
    </div>
  );
};

const ContentCard = ({ children, className }) => {
  return (
    <div className={cn('rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8', className)}>
      {children}
    </div>
  );
};

const DashboardCard = ({ children, className }) => {
  return (
    <div className={cn('rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8', className)}>
      {children}
    </div>
  );
};

const Error = ({ error }) => {
  if (!error) return null;
  return (
    <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-rose-200 text-sm">
      {typeof error === 'string' ? error : error?.message || 'Something went wrong.'}
    </div>
  );
};

const Empty = ({ title, description }) => {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 text-center">
      <div className="text-lg font-bold">{title}</div>
      {description ? (
        <div className="mt-2 text-sm text-white/70">{description}</div>
      ) : null}
    </div>
  );
};

const Skeleton = ({ count = 6, cols = 3 }) => {
  const items = Array.from({ length: count });
  return (
    <Grid cols={cols} gap={6}>
      {items.map((_, idx) => (
        <div
          key={idx}
          className="h-40 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse"
        />
      ))}
    </Grid>
  );
};

const Home = ({ children }) => {
  return (
    <div className="relative">
      <div className="pt-24 sm:pt-28 pb-10">{children}</div>
    </div>
  );
};

export default function PageLayout({
  maxWidth = 'lg',
  className,
  children,
}) {
  return (
    <PageContainer maxWidth={maxWidth} className={className}>
      {children}
    </PageContainer>
  );
}

PageLayout.Container = PageContainer;
PageLayout.Centered = Centered;
PageLayout.Grid = Grid;
PageLayout.Header = Header;
PageLayout.Auth = Auth;
PageLayout.Detail = Detail;
PageLayout.Content = Content;
PageLayout.Dashboard = Dashboard;
PageLayout.Ecommerce = Ecommerce;
PageLayout.ContentCard = ContentCard;
PageLayout.DashboardCard = DashboardCard;
PageLayout.Error = Error;
PageLayout.Empty = Empty;
PageLayout.Skeleton = Skeleton;
PageLayout.Home = Home;

