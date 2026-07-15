const { z } = require('zod');

const emailSchema = z.string().trim().email();

const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['consumer', 'restaurant_owner', 'courier']).optional(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const resetPasswordSchema = z.object({
  email: emailSchema,
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

module.exports = {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
};

