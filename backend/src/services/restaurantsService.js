const Restaurant = require('../models/Restaurant');

const createRestaurant = async ({ name, address, phone, status, location, ownerId }) => {
  const restaurant = await Restaurant.create({
    name,
    address,
    phone,
    status,
    // Backwards compatible: location is optional for existing clients.
    location,
    ownerId,
  });
  return restaurant;
};


const listRestaurants = async (filters = {}) => {
  const { search, cuisine, rating } = filters || {};

  const query = {};

  if (search && typeof search === 'string') {
    query.name = { $regex: search.trim(), $options: 'i' };
  }

  if (cuisine && typeof cuisine === 'string') {
    // Case-insensitive exact match for cuisine
    query.cuisine = { $regex: `^${cuisine.trim()}$`, $options: 'i' };
  }

  if (rating !== undefined && rating !== null) {
    query.rating = { $gte: Number(rating) };
  }


  return Restaurant.find(query);
};


const getRestaurantById = async (restaurantId) => {
  return Restaurant.findById(restaurantId);
};

const updateRestaurant = async (restaurantId, { name, address, phone, status }) => {
  return Restaurant.findByIdAndUpdate(
    restaurantId,
    { $set: { name, address, phone, status } },
    { new: true }
  );
};

const deleteRestaurant = async (restaurantId) => {
  const deleted = await Restaurant.findByIdAndDelete(restaurantId);
  return deleted;
};

const nearbyRestaurants = async ({
  longitude,
  latitude,
  radius,
  cuisine,
  rating
}) => {
  // $geoNear requires a proper 2dsphere index on the geospatial field.
  // distanceField will be returned on each document.
  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        distanceField: 'distance',
        spherical: true,
        // Mongo expects radius in meters for 2dsphere with GeoJSON.
        maxDistance: radius,
      },
    },
  ];

  if (cuisine !== undefined && cuisine !== null && typeof cuisine === 'string' && cuisine.trim()) {
    // Case-insensitive match (applied after $geoNear)
    pipeline.push({
      $match: {
        cuisine: { $regex: `^${cuisine.trim()}$`, $options: 'i' },
      },
    });
  }

  if (rating !== undefined && rating !== null) {
    const ratingNum = Number(rating);
    if (Number.isFinite(ratingNum)) {
      // Minimum rating filter (applied after $geoNear)
      pipeline.push({
        $match: {
          rating: { $gte: ratingNum },
        },
      });
    }
  }

  pipeline.push(
    {
      // Sort by distance (asc) and rating (desc)
      $sort: { distance: 1, rating: -1 },
    },
    {
      $project: {
        name: 1,
        address: 1,
        phone: 1,
        status: 1,
        cuisine: 1,
        rating: 1,
        location: 1,
        distance: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  );

  const results = await Restaurant.aggregate(pipeline);


  return results;
};

module.exports = {
  createRestaurant,
  listRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  nearbyRestaurants,
};



