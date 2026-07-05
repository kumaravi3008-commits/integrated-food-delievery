const test = require('node:test');
const assert = require('node:assert/strict');

const ordersService = require('../src/services/ordersService');
const Order = require('../src/models/Order');
const Cart = require('../src/models/Cart');

test('createOrderFromCart creates an order from the cart and clears the cart', async () => {
  const originalCartFindById = Cart.findById;
  const originalCartFindByIdAndUpdate = Cart.findByIdAndUpdate;
  const originalOrderCreate = Order.create;

  let capturedOrderPayload;
  let capturedCartUpdate;

  try {
    Cart.findById = async () => ({
      _id: 'cart-id',
      customerId: 'customer-1',
      restaurantId: 'restaurant-1',
      items: [{ menuItemId: 'item-1', name: 'Pizza', quantity: 2, unitPrice: 10 }],
    });
    Cart.findByIdAndUpdate = async (_id, update) => {
      capturedCartUpdate = update;
      return { _id, ...update.$set };
    };
    Order.create = async (payload) => {
      capturedOrderPayload = payload;
      return { ...payload, _id: 'order-1' };
    };

    const result = await ordersService.createOrderFromCart({
      customerId: 'customer-1',
      cartId: '507f1f77bcf86cd799439011',
    });

    assert.equal(result.restaurantId, 'restaurant-1');
    assert.equal(capturedOrderPayload.status, 'PLACED');
    assert.deepEqual(capturedCartUpdate.$set, { items: [], restaurantId: null });
  } finally {
    Cart.findById = originalCartFindById;
    Cart.findByIdAndUpdate = originalCartFindByIdAndUpdate;
    Order.create = originalOrderCreate;
  }
});

test('updateStatus rejects a courier transition that is not allowed for their role', async () => {
  const originalOrderFindById = Order.findById;
  const originalOrderFindByIdAndUpdate = Order.findByIdAndUpdate;

  try {
    Order.findById = async () => ({
      _id: 'order-1',
      status: 'PLACED',
      timestamps: {},
    });
    Order.findByIdAndUpdate = async () => ({
      _id: 'order-1',
      status: 'PREPARING',
    });

    await assert.rejects(
      () => ordersService.updateStatus('507f1f77bcf86cd799439011', 'PREPARING', {}, 'courier'),
      (err) => {
        assert.equal(err.statusCode, 403);
        assert.match(err.message, /not authorized/i);
        return true;
      }
    );
  } finally {
    Order.findById = originalOrderFindById;
    Order.findByIdAndUpdate = originalOrderFindByIdAndUpdate;
  }
});
