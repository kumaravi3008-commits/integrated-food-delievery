const MenuSearch = ({ searchValue, setSearchValue }) => {
  return (
    <input
      type="text"
      placeholder="Search.."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full px-3 py-2 bg-white text-black placeholder-gray-500 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
    />
  );
};

export default MenuSearch;
