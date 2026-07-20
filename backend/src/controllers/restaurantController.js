const Restaurant = require('../models/Restaurant');

/**
 * GET /api/restaurants
 * Query params:
 *   - search  : case-insensitive match against name, cuisine, or items.name
 *   - location: case-insensitive match against location or address field
 */
const listRestaurants = async (req, res, next) => {
  try {
    const { search, location, mode } = req.query;

    const filter = {};

    // Build search filter: match against name, cuisine array, or items.name
    if (search && search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');

      filter.$or = [
        { name: regex },
        { cuisine: regex },
        { 'items.name': regex },
      ];
    }

    // Build location filter: match against location or address field
    if (location && location.trim()) {
      const escaped = location.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const locRegex = new RegExp(escaped, 'i');

      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { location: locRegex },
          { address: locRegex },
        ],
      });
    }

    // Mode filter: 'order' filters to delivery-type restaurants only
    if (mode === 'order') {
      const typeFilter = { $or: [{ type: 'delivery' }, { type: 'both' }] };
      if (filter.$and) {
        filter.$and.push(typeFilter);
      } else {
        filter.$and = [typeFilter];
      }
    }

    const restaurants = await Restaurant.find(filter)
      .sort({ rating: -1, name: 1 })
      .limit(50)
      .lean();

    return res.json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/restaurants/:id
 */
const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).lean();

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    return res.json({
      success: true,
      data: restaurant,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listRestaurants,
  getRestaurant,
};

