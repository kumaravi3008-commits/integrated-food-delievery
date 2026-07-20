import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero({ searchMode = "order", setSearchMode }) {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("query", searchQuery.trim());
    if (location.trim()) params.set("location", location.trim());
    params.set("mode", searchMode);
    const qs = params.toString();
    navigate(`/restaurants?${qs}`);
  };

  return (
    <section className="w-full bg-black flex justify-center items-center py-12 md:py-20 border-b border-neutral-900/50">

      {/* THIS DIV MUST HAVE mx-auto AND w-full TO CENTER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <span className="inline-block text-orange-500 uppercase font-bold text-xs tracking-wider mb-4 px-3.5 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            % Every Cuisine. Every Restaurant. Every Time.
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Dine Your Favorites. <br />
            <span className="text-orange-500">Express Your Cravings.</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg mb-8 max-w-xl">
            Dine Express: Order, book, and collect—the future of dining in one tap.
          </p>

          <div className="w-full max-w-xl flex flex-col gap-6">
            {/* Toggle Switch */}
            <div className="flex items-center gap-3 bg-neutral-900/90 p-1.5 rounded-full border border-neutral-800 w-fit">
              <button
                onClick={() => setSearchMode("order")}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  searchMode === "order" ? "bg-orange-500 text-white" : "text-neutral-400"
                }`}
              >
                ORDER FOOD
              </button>
              <button
                onClick={() => setSearchMode("dine-in")}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  searchMode === "dine-in" ? "bg-orange-500 text-white" : "text-neutral-400"
                }`}
              >
                EXPLORE RESTAURANTS
              </button>
            </div>

            {/* Search Input Bar */}
            <form
              onSubmit={handleSearch}
              className="w-full flex flex-col sm:flex-row items-center gap-3 bg-neutral-900/90 border border-neutral-800 p-2 rounded-2xl shadow-2xl"
            >
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full sm:w-1/3 bg-transparent text-white text-sm px-3 py-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Search for your favorite flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-2/3 bg-transparent text-white text-sm px-3 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
          <div className="w-full max-w-md rounded-[40px] border-4 border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl">
            {/* Mockup graphic content */}
          </div>
        </div>

      </div>
    </section>
  );
}

