const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ success: false, message: 'JWT_SECRET is not set' });
    }

    const decoded = jwt.verify(token, jwtSecret);

    // decoded includes: sub, role, email
    req.user = {
      userId: decoded.sub,
      role: decoded.role,
      email: decoded.email,
    };

    return next();
  } catch (err) {
    const msg = err?.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid or expired token';
    return res.status(401).json({ success: false, message: msg });
  }
};

module.exports = {
  requireAuth,
};

