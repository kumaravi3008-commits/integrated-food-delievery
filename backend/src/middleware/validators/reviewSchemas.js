const { z } = require('zod');

const objectId = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-fA-F0-9]{24}$/,'Invalid ObjectId');

const createReviewSchema = z.object({
  orderId: objectId,
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().trim().min(1).optional(),
});

module.exports = {
  createReviewSchema,
};

