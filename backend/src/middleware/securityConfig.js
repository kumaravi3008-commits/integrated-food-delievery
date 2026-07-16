function getFrontendOrigin() {
  return (
    process.env.FRONTEND_ORIGIN ||
    process.env.CORS_ORIGIN ||
    process.env.CLIENT_ORIGIN ||
    ''
  );
}

function corsOriginResolver(origin, callback) {
  const allowedFrontendOrigin = getFrontendOrigin();

  // Allow non-browser requests (no Origin header)
  if (!origin) return callback(null, true);

  // If env var is provided, allow only that origin
  if (allowedFrontendOrigin) {
    return callback(null, origin === allowedFrontendOrigin);
  }

  // Otherwise allow localhost dev
  const isLocalhost =
    /^http:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(origin) ||
    /^http:\/\/localhost:\\d+/.test(origin);

  return callback(null, isLocalhost);
}

module.exports = {
  corsOriginResolver,
};

