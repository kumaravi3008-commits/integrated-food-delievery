import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4 lg:gap-5">

      {/* Search Button */}
      <button
        className="
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-full
          text-white
          bg-white/5
          border border-white/10
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white/10
          hover:border-orange-400/40
          hover:text-orange-400
          hover:scale-105
        "
      >
        <FiSearch size={20} />
      </button>

      {/* Cart Button */}
      <button
        className="
          relative
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-full
          text-white
          bg-white/5
          border border-white/10
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white/10
          hover:border-orange-400/40
          hover:text-orange-400
          hover:scale-105
        "
      >
        <FiShoppingCart size={20} />

        {/* Cart Badge */}
        <span
          className="
            absolute
            -top-1
            -right-1
            flex
            items-center
            justify-center
            w-5
            h-5
            rounded-full
            bg-orange-500
            text-[10px]
            font-bold
            text-white
          "
        >
          0
        </span>
      </button>

      {/* Login Button */}
<Link
  to="/login"
  className="
    ml-4

    flex
    items-center
    justify-center

    h-11
    px-8

    rounded-full

    bg-gradient-to-r
    from-orange-500
    to-yellow-400

    text-white
    text-[15px]
    font-semibold
    tracking-wide

    transition-all
    duration-300

    hover:scale-105
    hover:shadow-[0_0_25px_rgba(249,115,22,0.45)]

    active:scale-95
  "
>
  Login
</Link>

    </div>
  );
};

export default ActionButtons;