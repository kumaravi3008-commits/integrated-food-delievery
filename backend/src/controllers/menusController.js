const {
  createMenu,
  listMenusByRestaurant,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require('../services/menusService');

const isCastError = (err) => {
  return (
    err &&
    (err.name === 'CastError' ||
      (typeof err.message === 'string' && err.message.toLowerCase().includes('cast to')))
  );
};

const createMenuHandler = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, description, items, status } = req.body || {};

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ success: false, message: 'Validation error: name is required' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: items must be a non-empty array' });
  }

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({ success: false, message: 'Validation error: invalid item entry' });
    }
    if (!item.name || typeof item.name !== 'string') {
      return res.status(400).json({ success: false, message: 'Validation error: item.name is required' });
    }
    if (typeof item.price !== 'number' || item.price < 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation error: item.price must be a number >= 0' });
    }
  }

  if (status && !['ACTIVE', 'INACTIVE'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Validation error: status must be ACTIVE or INACTIVE' });
  }

  try {
    const menu = await createMenu({ restaurantId, name, description, items, status });
    return res.status(201).json({ success: true, data: menu });
  } catch (err) {
    if (isCastError(err)) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    throw err;
  }
};

const listMenusByRestaurantHandler = async (req, res) => {
  const { restaurantId } = req.params;
  const { category } = req.query || {};

  try {
    const menus = await listMenusByRestaurant({ restaurantId, category });
    return res.status(200).json({ success: true, data: menus });
  } catch (err) {
    if (isCastError(err)) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    throw err;
  }
};

const getMenuHandler = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menu = await getMenuById(menuId);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    return res.status(200).json({ success: true, data: menu });
  } catch (err) {
    if (isCastError(err)) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    throw err;
  }
};

const updateMenuHandler = async (req, res) => {
  const { menuId } = req.params;
  const { name, description, items, status } = req.body || {};

  if (status && !['ACTIVE', 'INACTIVE'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Validation error: status must be ACTIVE or INACTIVE' });
  }

  if (items !== undefined) {
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation error: items must be a non-empty array' });
    }
    for (const item of items) {
      if (!item || typeof item !== 'object') {
        return res.status(400).json({ success: false, message: 'Validation error: invalid item entry' });
      }
      if (!item.name || typeof item.name !== 'string') {
        return res.status(400).json({ success: false, message: 'Validation error: item.name is required' });
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation error: item.price must be a number >= 0' });
      }
    }
  }

  try {
    const updated = await updateMenu(menuId, { name, description, items, status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    if (isCastError(err)) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    throw err;
  }
};

const deleteMenuHandler = async (req, res) => {
  const { menuId } = req.params;

  try {
    const deleted = await deleteMenu(menuId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    return res.status(200).json({ success: true, data: { menuId: deleted._id } });
  } catch (err) {
    if (isCastError(err)) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    throw err;
  }
};

module.exports = {
  createMenuHandler,
  listMenusByRestaurantHandler,
  getMenuHandler,
  updateMenuHandler,
  deleteMenuHandler,
};


