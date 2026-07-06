import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Reservations", path: "/reservations" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex items-center gap-6 xl:gap-10">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `relative text-[16px] xl:text-[17px] font-semibold transition-all duration-300 pb-1
                ${
                  isActive
                    ? "text-orange-500"
                    : "text-white hover:text-yellow-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "w-full bg-gradient-to-r from-orange-500 to-yellow-400"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;