import type { Chat, MessageReceived, MessagesState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: MessagesState = {
  chats: [],
  currentChatId: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    chatsLoaded: (state, action: PayloadAction<Chat[]>) => ({ ...state, chats: action.payload }),
    messageReceived: (state, action: PayloadAction<MessageReceived>) => {
      const { id, senderId, receiverId, currentUserId, value } = action.payload;
      let chatId = '';
      // eslint-disable-next-line eqeqeq
      if (senderId == currentUserId)
        chatId = `${senderId}_${receiverId}_key`;
      else
        chatId = `${receiverId}_${senderId}_key`;

      const chat = state.chats.find(chat => chat.id === chatId);
      const message = { id, senderId, receiverId, value };
      chat?.messages.push(message);
    },
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentChatId: action.payload,
      };
    },
  },
});

export default messagesSlice;

export const {
  chatsLoaded,
  messageReceived,
  setCurrentChatId,
} = messagesSlice.actions;
