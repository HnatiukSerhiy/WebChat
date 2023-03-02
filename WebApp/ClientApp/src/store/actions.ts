import {
  pushUser,
  removeUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from 'behavior/authentication';

import { messageReceived, sendMessage } from 'behavior/messages';
import { createWebSocketConnection, disconnectWebSocket } from 'behavior/webSocket';

const actions = {
  pushUser,
  removeUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  createWebSocketConnection,
  disconnectWebSocket,
  messageReceived,
  sendMessage,
};

export default actions;
