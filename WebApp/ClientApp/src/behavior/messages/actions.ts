import { createAction } from '@reduxjs/toolkit';
import { MessageInput } from './types';

enum Action {
  SendMessage = 'messages/send',
  GetChats = 'chats/get',
}

export const sendMessage = createAction<MessageInput>(Action.SendMessage);
export const getChats = createAction<number>(Action.GetChats);

export type MessagesAction = ReturnType<
  | typeof sendMessage
>;
