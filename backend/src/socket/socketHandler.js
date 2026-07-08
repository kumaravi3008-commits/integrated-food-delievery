const { joinOrderRoom, leaveOrderRoom } = require('./orderRooms');

const SUPPORTED_ROLES = new Set(['consumer', 'restaurant_owner', 'courier']);

/**
 * Register all socket event handlers.
 *
 * Note: Keep this file modular; placeholder events will be added here later.
 */
function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('Socket connected');

    // Graceful disconnect handling
    socket.on('disconnect', (reason) => {
      // eslint-disable-next-line no-console
      console.log('Socket disconnected', reason);
    });

    // Join an order room
    socket.on('join_order', (payload) => {
      const orderId = payload?.orderId;

      // No business validation yet - just a minimal guard for logs/room naming.
      // Future: validate orderId + role based on auth/JWT.
      if (!orderId) return;

      // Prepare roles for future use.
      // Clients may send role in payload later; we keep it optional for now.
      const role = payload?.role;
      if (role && !SUPPORTED_ROLES.has(role)) {
        return;
      }

      joinOrderRoom(socket, orderId);
    });

    // Leave an order room
    socket.on('leave_order', (payload) => {
      // Accept either { orderId } or { orderId: ... }
      const orderId = payload?.orderId;
      if (!orderId) return;
      leaveOrderRoom(socket, orderId);
    });

    // Placeholder events only (no emission of real updates yet)
    // Future realtime events will be emitted from other services using `getSocket()`.
    socket.on('order_status_updated', () => {
      // placeholder handler
    });

    socket.on('courier_location', () => {
      // placeholder handler
    });

    socket.on('order_cancelled', () => {
      // placeholder handler
    });
  });
}

module.exports = {
  registerSocketHandlers,
  SUPPORTED_ROLES,
};

