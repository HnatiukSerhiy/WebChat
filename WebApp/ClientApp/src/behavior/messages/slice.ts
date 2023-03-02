import type { Message, MessagesState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MessagesState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageReceived: (state, { payload }: PayloadAction<Message>) => [...state, payload],
  },
});

export default messagesSlice;

export const {
  messageReceived,
} = messagesSlice.actions;
