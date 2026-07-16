const { z } = require('zod');

const objectId = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-fA-F0-9]{24}$/,'Invalid ObjectId');

const paymentPaySchema = z.object({
  // orderId is taken from params
  simulate: z.boolean().optional().default(false).transform(v => !!v),
});

module.exports = {
  paymentPaySchema,
};

