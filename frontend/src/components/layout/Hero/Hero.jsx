import { ArrowRight, Utensils } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[650px] h-[650px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1500px] w-full mx-auto px-8 lg:px-20 grid lg:grid-cols-[55%_45%] items-center gap-16 relative z-10">

        {/* LEFT CONTENT */}
        <div className="max-w-[700px] flex flex-col justify-center">

          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.22em] text-gray-400">
            <Utensils size={14} className="text-orange-600" />
            <span>Premium Dining Experience</span>
          </div>

          {/* Heading */}
<div className="mt-10">
  <h1 className="text-5xl lg:text-[74px] font-semibold text-white leading-tight">
    Welcome to
  </h1>

  <h2 className="mt-3 text-6xl lg:text-[88px] font-bold text-[#e65100] leading-tight">
    DineExpress
  </h2>
</div>
{/* TAGLINE & BUTTONS CONTAINER */}
{/* flex-col ensures they stack vertically, gap-10 forces a perfect gap between them */}
<div className="flex flex-col gap-10 mt-10">

  {/* Tagline */}
  {/* Removed mb-14 and mt-10 to let the parent container manage the spacing */}
  <div className="flex flex-wrap items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-gray-500">
    <span>Discover</span>
    <span className="text-orange-600">•</span>

    <span>Dine</span>
    <span className="text-orange-600">•</span>

    <span>Deliver</span>
  </div>

 {/* Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Button 1: Start Exploring */}
            <button className="min-w-[190px] h-12 rounded-full bg-[#b23c00] hover:bg-[#d94e00] text-white text-sm font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors flex items-center justify-center gap-3 px-8 shadow-xl shadow-orange-900/20">
              <span>Start Exploring</span>
              <ArrowRight size={18} className="shrink-0" />
            </button>

            {/* Button 2: View Menus */}
            <button className="min-w-[150px] h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 text-white text-sm font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors flex items-center justify-center px-8">
              <span>View Menus</span>
            </button>
          </div>

        </div>

        {/* Stats */}
        {/* Increased mt-16 to mt-24 for gap above the line, and pt-8 to pt-10 below the line */}
        <div className="flex justify-between max-w-[620px] mt-24 pt-10 border-t border-white/10">

          {[
            {
              value: "500+",
              label: "Restaurants",
            },
            {
              value: "20min",
              label: "Avg Delivery",
            },
            {
              value: "4.9/5",
              label: "Rating",
            },
          ].map((item, index) => (
            <div key={index}>

              <h3 className="text-4xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="relative h-[620px] hidden lg:block pl-10">

        {/* Glow */}
        <div className="absolute -top-10 left-12 w-80 h-80 bg-orange-600/10 blur-3xl rounded-full" />

        {/* Burger */}
        <div className="absolute top-0 left-0 w-72 h-[450px] rounded-[40px] overflow-hidden border-[6px]  border-[#3d3d3d] shadow-2xl z-30">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ramen */}
        <div className="absolute top-16 right-0 w-80 h-64 rounded-[32px] overflow-hidden border-[6px] border-[#3d3d3d] shadow-2xl rotate-2 z-20">
          <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800"
            alt="Ramen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sushi */}
        <div className="absolute bottom-0 left-20 w-80 h-64 rounded-[32px] overflow-hidden border-[6px] border-[#3d3d3d] shadow-2xl -rotate-2 z-10">
          <img
            src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800"
            alt="Sushi"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </div>
  </section>
);
};

export default Hero;