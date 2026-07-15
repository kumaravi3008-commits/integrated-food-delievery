const helmet = require('helmet');

function helmetMiddleware() {
  return helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    // Keep defaults; do not block any existing functionality
  });
}

module.exports = { helmetMiddleware };

