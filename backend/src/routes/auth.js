const express = require('express');

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { permitRoles } = require('../middleware/rbac');

const { validateBody } = require('../middleware/validateBodyZod');
const { registerSchema, loginSchema, resetPasswordSchema } = require('../middleware/validators/authSchemas');

const router = express.Router();

router.post('/auth/register', validateBody(registerSchema), authController.registerHandler);
router.post('/auth/login', validateBody(loginSchema), authController.loginHandler);
router.post('/auth/reset-password', validateBody(resetPasswordSchema), authController.resetPasswordHandler);
router.get(
  '/auth/profile',
  requireAuth,
  permitRoles('consumer', 'restaurant_owner', 'courier'),
  authController.profileHandler
);

module.exports = router;


