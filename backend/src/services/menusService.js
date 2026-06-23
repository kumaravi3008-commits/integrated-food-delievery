const Menu = require('../models/Menu');

const createMenu = async ({ restaurantId, name, description, items, status }) => {
  return Menu.create({ restaurantId, name, description, items, status });
};

const listMenusByRestaurant = async ({ restaurantId, category } = {}) => {
  const baseQuery = { restaurantId };

  // Category filtering: match against menu item name (and optionally description).
  if (category && typeof category === 'string' && category.trim()) {
    const safeCategory = category.trim();
    const categoryRegex = new RegExp(safeCategory, 'i');

    // Menu.items[] may contain name/description. We match both.
    return Menu.find({
      ...baseQuery,
      $or: [{ 'items.name': categoryRegex }, { 'items.description': categoryRegex }],
    });
  }

  return Menu.find(baseQuery);
};

const getMenuById = async (menuId) => {
  return Menu.findById(menuId);
};

const updateMenu = async (menuId, { name, description, items, status }) => {
  return Menu.findByIdAndUpdate(
    menuId,
    { $set: { name, description, items, status } },
    { new: true }
  );
};

const deleteMenu = async (menuId) => {
  return Menu.findByIdAndDelete(menuId);
};

module.exports = {
  createMenu,
  listMenusByRestaurant,
  getMenuById,
  updateMenu,
  deleteMenu,
};


