const test = require('node:test');
const assert = require('node:assert/strict');

const cartService = require('../src/services/cartService');
const Cart = require('../src/models/Cart');
const Menu = require('../src/models/Menu');

test('allows adding an item from the same restaurant to an existing cart', async () => {
  const originalFindOne = Cart.findOne;
  const originalCreate = Cart.create;
  const originalMenuFindOne = Menu.findOne;

  const cart = {
    customerId: 'customer-1',
    restaurantId: 'restaurant-a',
    items: [{ menuItemId: 'item-a', quantity: 1 }],
    save: async function () {
      this.saved = true;
      return this;
    },
  };

  try {
    Cart.findOne = async () => cart;
    Cart.create = async () => ({
      _id: 'cart-id',
      customerId: 'customer-1',
      restaurantId: 'restaurant-a',
      items: [],
    });
    Menu.findOne = () => ({
      select: () => ({
        restaurantId: 'restaurant-a',
        items: [{ _id: 'item-a', name: 'Pizza', price: 10 }],
      }),
    });

    const result = await cartService.addItemToCart({
      customerId: 'customer-1',
      menuItemId: 'item-a',
      quantity: 2,
    });

    assert.equal(result.restaurantId, 'restaurant-a');
    assert.equal(result.items[0].quantity, 3);
  } finally {
    Cart.findOne = originalFindOne;
    Cart.create = originalCreate;
    Menu.findOne = originalMenuFindOne;
  }
});

test('rejects adding an item from a different restaurant to an existing cart', async () => {
  const originalFindOne = Cart.findOne;
  const originalCreate = Cart.create;
  const originalMenuFindOne = Menu.findOne;

  const cart = {
    customerId: 'customer-1',
    restaurantId: 'restaurant-a',
    items: [{ menuItemId: 'item-a', quantity: 1 }],
    save: async function () {
      this.saved = true;
      return this;
    },
  };

  try {
    Cart.findOne = async () => cart;
    Cart.create = async () => ({
      _id: 'cart-id',
      customerId: 'customer-1',
      restaurantId: 'restaurant-a',
      items: [],
    });
    Menu.findOne = (query) => ({
      select: () => {
        if (query['items._id'] === 'item-a') {
          return { restaurantId: 'restaurant-a', items: [{ _id: 'item-a', name: 'Pizza', price: 10 }] };
        }
        return { restaurantId: 'restaurant-b', items: [{ _id: 'item-b', name: 'Burger', price: 8 }] };
      },
    });

    await assert.rejects(
      () => cartService.addItemToCart({
        customerId: 'customer-1',
        menuItemId: 'item-b',
        quantity: 1,
      }),
      (err) => {
        assert.equal(err.statusCode, 400);
        assert.match(err.message, /only one restaurant/i);
        return true;
      }
    );
  } finally {
    Cart.findOne = originalFindOne;
    Cart.create = originalCreate;
    Menu.findOne = originalMenuFindOne;
  }
});
