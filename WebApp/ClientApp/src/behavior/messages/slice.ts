import type { Chat, Message, MessagesState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: MessagesState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    chatsLoaded: (state, { payload }: PayloadAction<Chat[]>) => payload,
    messageReceived: (state, { payload }: PayloadAction<Message>) => {
      const chatId = payload.receiverId + ' ' + payload.senderId;
      const updatedChats = state.map(chat => {
        if (chat.id === chatId) {
          chat.messages.push(payload);
          return chat;
        }
        return chat;
      });

      return updatedChats;
    },
  },
});

export default messagesSlice;

export const {
  chatsLoaded,
  messageReceived,
} = messagesSlice.actions;
