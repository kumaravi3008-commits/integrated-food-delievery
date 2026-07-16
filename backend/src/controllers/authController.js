const authService = require('../services/authService');

const VALID_ROLES = new Set(['consumer', 'restaurant_owner', 'courier']);

const registerHandler = async (req, res) => {
  try {
    const { email, password, role } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const safeRole = role || 'consumer';
    if (!VALID_ROLES.has(safeRole)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const result = await authService.register({ email: normalizedEmail, password, role: safeRole });

    return res.status(201).json({ success: true, message: 'User registered', data: result });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const result = await authService.login({ email: email.trim().toLowerCase(), password });

    return res.status(200).json({ success: true, data: { token: result.token } });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const profileHandler = async (req, res) => {
  try {
    // authMiddleware attaches req.user
    const { userId } = req.user;

    const profile = await authService.getProfileById({ userId });

    return res.status(200).json({ success: true, message: 'Profile fetched', data: profile });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const resetPasswordHandler = async (req, res) => {
  try {
    const { email, newPassword } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const result = await authService.resetPassword({
      email: email.trim().toLowerCase(),
      newPassword,
    });

    return res.status(200).json({ success: true, message: result.message, data: result });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  profileHandler,
  resetPasswordHandler,
};

