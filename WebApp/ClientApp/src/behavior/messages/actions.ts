import { createAction } from '@reduxjs/toolkit';
import { MessageInput } from './types';

enum Action {
  SendMessage = 'messages/send',
}

export const sendMessage = createAction<MessageInput>(Action.SendMessage);

export type MessagesAction = ReturnType<
  | typeof sendMessage
>;
