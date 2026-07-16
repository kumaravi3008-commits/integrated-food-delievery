import AppLayout from '../../components/layout/AppLayout';

export default function PremiumPageShell({
  title,
  subtitle,
  children,
}) {

  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-80px)] w-full bg-[#050505] text-white overflow-x-hidden">
        <div className="relative">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[#FF7A00]/10 blur-[80px] rounded-full" />
          <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-white/[0.05] blur-[90px] rounded-full" />

          <div className="relative w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-14">
            {(title || subtitle) && (
              <div className="max-w-5xl mx-auto text-center">
                {title && (
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="max-w-5xl mx-auto mt-10">{children}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

