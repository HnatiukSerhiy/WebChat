import {
  pushUser,
  removeUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from 'behavior/authentication';

import { messageReceived, sendMessage, getChats, chatsLoaded, setCurrentChatId } from 'behavior/messages';
import { createWebSocketConnection, disconnectWebSocket } from 'behavior/webSocket';
import { searchUser } from 'behavior/users/actions';

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
  getChats,
  searchUser,
  chatsLoaded,
  setCurrentChatId,
};

export default actions;
