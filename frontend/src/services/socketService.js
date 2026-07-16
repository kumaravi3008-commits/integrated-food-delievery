import { io } from 'socket.io-client';
import { socketBaseUrl } from '../utils/helpers';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(socketBaseUrl(), {
      transports: ['websocket', 'polling'],
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};

export const joinOrderRoom = (orderId, role = 'consumer') => {
  const s = connectSocket();
  s.emit('join_order', { orderId, role });
  return s;
};

export const leaveOrderRoom = (orderId) => {
  if (!socket) return;
  socket.emit('leave_order', { orderId });
};
