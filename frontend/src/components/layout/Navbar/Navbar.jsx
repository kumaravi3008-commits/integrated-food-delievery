import { useEffect, useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ActionButtons from "./ActionButtons";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Orange Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-28
            w-[650px]
            h-[260px]
            rounded-full
            bg-orange-500/10
            blur-3xl
          "
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 pt-5">

        {/* Floating Glass Card */}
        <div
          className={`
            mx-4
            rounded-[24px]

            transition-all
            duration-500

            ${
              scrolled
                ? `
                    bg-zinc-900/65
                    backdrop-blur-xl
                    border border-white/10
                    shadow-2xl
                  `
                : `
                    bg-zinc-900/45
                    backdrop-blur-lg
                    border border-white/5
                  `
            }
          `}
        >

          {/* Glass Reflection */}
          <div
            className="
              absolute
              inset-x-10
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              pointer-events-none
            "
          />

          <div
            className="
              flex
              items-center
              justify-between

              h-[74px]

              px-4
              md:px-6
            "
          >

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <NavLinks />
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center">
              <ActionButtons />
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>

          </div>

        </div>

      </header>
    </>
  );
};

export default Navbar;