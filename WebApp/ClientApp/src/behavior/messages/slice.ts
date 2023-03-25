import type { Chat, Message, MessagesState } from './types';
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
    messageReceived: (state, action: PayloadAction<{ message: Message; chatId: string }>) => {
      const updatedChats = state.chats.map(chat => {
        if (chat.id === action.payload.chatId) {
          chat.messages.push(action.payload.message);
          return chat;
        }
        return chat;
      });

      return {
        ...state,
        chats: updatedChats,
      };
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
