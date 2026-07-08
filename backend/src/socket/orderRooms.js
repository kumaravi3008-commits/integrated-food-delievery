/**
 * Socket room naming convention for order updates.
 */
function orderRoomName(orderId) {
  return `order:${orderId}`;
}

/**
 * Join an order room.
 *
 * @param {import('socket.io').Socket} socket
 * @param {string|number} orderId
 */
async function joinOrderRoom(socket, orderId) {
  const room = orderRoomName(orderId);
  await socket.join(room);
  // eslint-disable-next-line no-console
  console.log(`Joined room ${room}`);
}

/**
 * Leave an order room.
 *
 * @param {import('socket.io').Socket} socket
 * @param {string|number} orderId
 */
async function leaveOrderRoom(socket, orderId) {
  const room = orderRoomName(orderId);
  await socket.leave(room);
  // eslint-disable-next-line no-console
  console.log(`Left room ${room}`);
}

module.exports = {
  joinOrderRoom,
  leaveOrderRoom,
  orderRoomName,
};

