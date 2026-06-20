const express = require('express');

const {
  createMenuHandler,
  listMenusByRestaurantHandler,
  getMenuHandler,
  updateMenuHandler,
  deleteMenuHandler,
} = require('../controllers/menusController');

const router = express.Router();

router.post('/restaurants/:restaurantId/menus', createMenuHandler);
router.get('/restaurants/:restaurantId/menus', listMenusByRestaurantHandler);
router.get('/menus/:menuId', getMenuHandler);
router.patch('/menus/:menuId', updateMenuHandler);
router.delete('/menus/:menuId', deleteMenuHandler);

module.exports = router;

