const Menu = require('../models/Menu');

const createMenu = async ({ restaurantId, name, description, items, status }) => {
  return Menu.create({ restaurantId, name, description, items, status });
};

const listMenusByRestaurant = async (restaurantId) => {
  return Menu.find({ restaurantId });
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

