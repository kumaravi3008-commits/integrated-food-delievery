const { z } = require('zod');

// Checkout currently does not accept body payload besides auth.
// Keep a permissive schema to avoid breaking callers.
const checkoutSchema = z.object({}).passthrough();

module.exports = {
  checkoutSchema,
};

