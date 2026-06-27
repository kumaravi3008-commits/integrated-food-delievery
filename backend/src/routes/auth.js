const express = require('express');

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { permitRoles } = require('../middleware/rbac');


const router = express.Router();

router.post('/auth/register', authController.registerHandler);
router.post('/auth/login', authController.loginHandler);
router.get(
  '/auth/profile',
  requireAuth,
  permitRoles('consumer', 'restaurant_owner', 'courier'),
  authController.profileHandler
);


module.exports = router;

