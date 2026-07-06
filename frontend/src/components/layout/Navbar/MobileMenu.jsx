import { FiMenu } from "react-icons/fi";

const MobileMenu = () => {
  return (
    <button className="lg:hidden text-white">
      <FiMenu size={28} />
    </button>
  );
};

export default MobileMenu;