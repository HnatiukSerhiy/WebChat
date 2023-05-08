import type { Chat, MessageReceived, MessagesState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: MessagesState = {
  chats: [],
  currentChatId: null,
};

type EmptyChat = {
  senderId: number;
  receiverId: number;
};

const isEmptyChat = (chat: Chat | EmptyChat): chat is EmptyChat => !('value' in chat);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    chatsLoaded: (state, action: PayloadAction<Chat[]>) => ({ ...state, chats: action.payload }),
    messageReceived: (state, action: PayloadAction<MessageReceived | EmptyChat>) => {
      let chatId = '';

      if (isEmptyChat(action.payload)) {
        const { senderId, receiverId } = action.payload;
        chatId = `${senderId}_${receiverId}_key`;
        state.chats.push({ id: chatId, messages: [] });
        return;
      }

      const { id, senderId, receiverId, currentUserId, value } = action.payload;
      // eslint-disable-next-line eqeqeq
      if (senderId == currentUserId)
        chatId = `${senderId}_${receiverId}_key`;
      else
        chatId = `${receiverId}_${senderId}_key`;

      const message = { id, senderId, receiverId, value };
      const chat = state.chats.find(chat => chat.id === chatId);

      if (chat) {
        chat.messages.push(message);
      } else {
        state.chats.push({ id: chatId, messages: [message] });
      }
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
