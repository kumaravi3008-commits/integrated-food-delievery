export const mockRestaurant = {
  id: 'r1',
  name: 'Saffron Spoon',
  cuisine: 'Indian • Biryani & Kebabs',
  rating: 4.7,
  ratingCount: 1832,
  etaMins: 28,
  distanceKm: 3.4,
  priceTier: '$$',
  isOpen: true,
  offers: [
    { id: 'o1', title: 'Free Delivery', subtitle: 'On orders above $25' },
    { id: 'o2', title: '20% OFF', subtitle: 'Use code SAFFRON20' },
  ],
  bannerImage:
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80',
  logoImage:
    'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=256&q=80',
  categories: [
    {
      id: 'c1',
      name: 'Biryani',
      items: [
        {
          id: 'm1',
          name: 'Chicken Biryani',
          description: 'Aromatic basmati with slow-cooked chicken.',
          price: 13.99,
          rating: 4.7,
          ratingCount: 921,
          vegetarian: false,
          isBestseller: true,
          image:
            'https://images.unsplash.com/photo-1604908176997-125f25d9a0b1?auto=format&fit=crop&w=1200&q=80',
          spiceLevels: ['Mild', 'Medium', 'Hot'],
          sizes: [
            { id: 's1', name: 'Regular', priceDelta: 0 },
            { id: 's2', name: 'Large', priceDelta: 3.5 },
          ],
          toppings: [
            { id: 't1', name: 'Extra Raita', price: 1.5 },
            { id: 't2', name: 'Boondi', price: 1.25 },
          ],
          nutritional: {
            calories: 690,
            carbs: '78g',
            protein: '32g',
            fat: '28g',
          },
          ingredients: ['Basmati rice', 'Chicken', 'Biryani masala', 'Saffron', 'Mint'],
        },
        {
          id: 'm2',
          name: 'Veg Dum Biryani',
          description: 'Vegetables layered with fragrant spices.',
          price: 11.49,
          rating: 4.5,
          ratingCount: 612,
          vegetarian: true,
          isBestseller: true,
          image:
            'https://images.unsplash.com/photo-1625944522303-4f3cddf2f9dd?auto=format&fit=crop&w=1200&q=80',
          spiceLevels: ['Mild', 'Medium', 'Hot'],
          sizes: [
            { id: 's1', name: 'Regular', priceDelta: 0 },
            { id: 's2', name: 'Large', priceDelta: 2.75 },
          ],
          toppings: [
            { id: 't1', name: 'Extra Raita', price: 1.25 },
            { id: 't3', name: 'Poppadum', price: 0.99 },
          ],
          nutritional: {
            calories: 560,
            carbs: '69g',
            protein: '20g',
            fat: '18g',
          },
          ingredients: ['Basmati rice', 'Seasonal veggies', 'Dum spices', 'Mint'],
        },
      ],
    },
    {
      id: 'c2',
      name: 'Starters',
      items: [
        {
          id: 'm3',
          name: 'Seekh Kebab (4 pcs)',
          description: 'Char-grilled kebabs with mint-yogurt sauce.',
          price: 9.99,
          rating: 4.6,
          ratingCount: 504,
          vegetarian: false,
          isBestseller: false,
          image:
            'https://images.unsplash.com/photo-1601050690597-7a1b10a6c6ab?auto=format&fit=crop&w=1200&q=80',
          spiceLevels: ['Mild', 'Medium', 'Hot'],
          sizes: [{ id: 's1', name: 'Standard', priceDelta: 0 }],
          toppings: [
            { id: 't1', name: 'Extra Sauce', price: 0.75 },
          ],
          nutritional: {
            calories: 430,
            carbs: '14g',
            protein: '28g',
            fat: '28g',
          },
          ingredients: ['Minced meat', 'Kebab masala', 'Mint', 'Yogurt'],
        },
      ],
    },
  ],
};

export const mockRestaurantNearby = [
  {
    id: 'nr1',
    name: 'Spice Route',
    cuisine: 'North Indian',
    rating: 4.4,
    etaMins: 33,
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80',
    isOpen: true,
  },
  {
    id: 'nr2',
    name: 'Green Garden',
    cuisine: 'Salads & Bowls',
    rating: 4.6,
    etaMins: 24,
    image:
      'https://images.unsplash.com/photo-1543353071-5b09a5f2a7a2?auto=format&fit=crop&w=1200&q=80',
    isOpen: true,
  },
];

