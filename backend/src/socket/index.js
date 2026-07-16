const { Server } = require('socket.io');

const { registerSocketHandlers } = require('./socketHandler');

/**
 * Keeps a single exported Socket.IO instance so future services can emit events.
 */
let ioInstance;

/**
 * Creates and attaches Socket.IO to the provided HTTP server.
 *
 * @param {import('http').Server} httpServer
 * @returns {import('socket.io').Server}
 */
function initSocket(httpServer) {
  if (ioInstance) return ioInstance;

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: false,
    },
  });

  ioInstance = io;

  registerSocketHandlers(io);

  return io;
}

function getSocket() {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized. Call initSocket(httpServer) first.');
  }
  return ioInstance;
}

module.exports = {
  initSocket,
  getSocket,
};

