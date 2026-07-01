const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || req.headers.Authorization || '';
    const accessTokenHeader = req.headers['x-access-token'] || req.headers['X-Access-Token'] || '';

    let token = '';

    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const trimmedHeader = authorizationHeader.trim();
      const parts = trimmedHeader.split(/\s+/);

      if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer' || !parts[1]) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }

      token = parts[1].trim();
    } else if (accessTokenHeader && typeof accessTokenHeader === 'string') {
      token = accessTokenHeader.trim();
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
    const decoded = jwt.verify(token, jwtSecret);

    req.user = {
      userId: decoded.sub,
      role: decoded.role,
      email: decoded.email,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = {
  requireAuth,
};

