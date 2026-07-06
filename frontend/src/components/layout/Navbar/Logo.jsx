import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 flex-shrink-0"
    >
      <img
        src={logo}
        alt="DineExpress Logo"
        className="
          h-10
          sm:h-12
          md:h-14
          lg:h-16
          xl:h-18
          w-auto
          object-contain
          transition-transform
          duration-300
          hover:scale-105
        "
      />
    </Link>
  );
};

export default Logo;