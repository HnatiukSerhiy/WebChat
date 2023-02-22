import { createAction } from '@reduxjs/toolkit';
import { WebSocketActionEnum } from './enums';

export const createSocketConnection = createAction(WebSocketActionEnum.CreateConnection);
