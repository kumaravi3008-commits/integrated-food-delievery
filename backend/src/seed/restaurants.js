const Restaurant = require('../models/Restaurant');

const RESTAURANTS = [
  {
    name: 'The Golden Fork',
    cuisine: ['Italian', 'Continental'],
    rating: 4.8,
    etaMins: 25,
    priceTier: '$$',
    isOpen: true,
    type: 'delivery',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    address: '123 Main Street, Downtown',
    location: 'Downtown',
    items: [
      { name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 12.99, category: 'Main Course' },
      { name: 'Pasta Carbonara', description: 'Creamy bacon and egg pasta', price: 14.99, category: 'Main Course' },
      { name: 'Bruschetta', description: 'Toasted bread with tomato and basil', price: 7.99, category: 'Starters' },
    ],
  },
  {
    name: 'Spice Symphony',
    cuisine: ['North Indian', 'Mughlai'],
    rating: 4.6,
    etaMins: 40,
    priceTier: '$$',
    isOpen: true,
    type: 'delivery',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    address: '456 Oak Avenue, Midtown',
    location: 'Midtown',
    items: [
      { name: 'Chicken Biryani', description: 'Aromatic basmati with spiced chicken', price: 13.99, category: 'Main Course' },
      { name: 'Butter Chicken', description: 'Creamy tomato-based curry', price: 15.99, category: 'Main Course' },
      { name: 'Garlic Naan', description: 'Tandoor-baked bread with garlic', price: 3.99, category: 'Breads' },
    ],
  },
  {
    name: 'Dragon Wok Lounge',
    cuisine: ['Chinese', 'Asian'],
    rating: 4.4,
    etaMins: 20,
    priceTier: '$$',
    isOpen: true,
    type: 'dine-in',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600&auto=format&fit=crop&q=80',
    address: '789 Elm Street, Chinatown',
    location: 'Chinatown',
    items: [
      { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts', price: 11.99, category: 'Main Course' },
      { name: 'Spring Rolls', description: 'Crispy vegetable rolls', price: 5.99, category: 'Starters' },
      { name: 'Fried Rice', description: 'Wok-fried rice with vegetables', price: 9.99, category: 'Main Course' },
    ],
  },
  {
    name: 'Basil & Vine',
    cuisine: ['Mediterranean'],
    rating: 4.7,
    etaMins: 30,
    priceTier: '$$$',
    isOpen: true,
    type: 'dine-in',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    address: '321 Pine Road, Arts District',
    location: 'Arts District',
    items: [
      { name: 'Grilled Halloumi Salad', description: 'Mixed greens with grilled halloumi', price: 12.99, category: 'Salads' },
      { name: 'Lamb Kebab Plate', description: 'Spiced lamb with tzatziki and pita', price: 16.99, category: 'Main Course' },
      { name: 'Hummus & Pita', description: 'Smooth chickpea dip with warm pita', price: 6.99, category: 'Starters' },
    ],
  },
  {
    name: 'Coastal Catch',
    cuisine: ['Seafood', 'Grill'],
    rating: 4.5,
    etaMins: 35,
    priceTier: '$$$',
    isOpen: true,
    type: 'delivery',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    address: '555 Harbor Blvd, Marina',
    location: 'Marina',
    items: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter', price: 18.99, category: 'Main Course' },
      { name: 'Fish & Chips', description: 'Beer-battered cod with fries', price: 14.99, category: 'Main Course' },
      { name: 'Shrimp Cocktail', description: 'Chilled shrimp with cocktail sauce', price: 10.99, category: 'Starters' },
    ],
  },
  {
    name: 'Sakura House',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.9,
    etaMins: 27,
    priceTier: '$$$',
    isOpen: true,
    type: 'dine-in',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    address: '888 Cherry Blossom Lane, Japantown',
    location: 'Japantown',
    items: [
      { name: 'Salmon Nigiri', description: 'Fresh salmon over seasoned rice', price: 8.99, category: 'Sushi' },
      { name: 'California Roll', description: 'Crab, avocado, and cucumber roll', price: 10.99, category: 'Sushi' },
      { name: 'Miso Soup', description: 'Traditional soybean soup with tofu', price: 4.99, category: 'Soups' },
    ],
  },
  {
    name: 'Southern Comfort',
    cuisine: ['South Indian'],
    rating: 4.6,
    etaMins: 23,
    priceTier: '$$',
    isOpen: true,
    type: 'delivery',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    address: '222 Coconut Grove, Little India',
    location: 'Little India',
    items: [
      { name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling', price: 8.99, category: 'Main Course' },
      { name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup', price: 6.99, category: 'Main Course' },
      { name: 'Filter Coffee', description: 'South Indian style coffee', price: 3.99, category: 'Beverages' },
    ],
  },
  {
    name: 'Sweet Nothings',
    cuisine: ['Desserts', 'Bakery'],
    rating: 4.8,
    etaMins: 17,
    priceTier: '$$',
    isOpen: true,
    type: 'delivery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    address: '777 Sugar Street, Downtown',
    location: 'Downtown',
    items: [
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: 7.99, category: 'Desserts' },
      { name: 'Tiramisu', description: 'Classic Italian coffee dessert', price: 8.99, category: 'Desserts' },
      { name: 'Fresh Fruit Tart', description: 'Butter crust with custard and berries', price: 9.99, category: 'Desserts' },
    ],
  },
];

const seedRestaurants = async () => {
  try {
    for (const restaurantData of RESTAURANTS) {
      const existing = await Restaurant.findOne({ name: restaurantData.name });

      if (existing) {
        Object.assign(existing, restaurantData);
        await existing.save();
        console.log(`${restaurantData.name} updated ✔`);
      } else {
        await Restaurant.create(restaurantData);
        console.log(`${restaurantData.name} created ✔`);
      }
    }
    console.log('All restaurants seeded successfully ✔');
  } catch (err) {
    console.error('Error seeding restaurants:', err?.message || err);
    throw err;
  }
};

module.exports = seedRestaurants;

