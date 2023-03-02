import { createAction } from '@reduxjs/toolkit';

enum Action  {
  CreateConnection = 'connection/create',
  ConnectionCreated = 'connection/created',
  Disconnect = 'connection/disconnect',
  Disconnected = 'connection/disconected',
}

export const createWebSocketConnection = createAction<{ userId: number }>(Action.CreateConnection);
export const webSocketConnectionCreated = createAction<unknown>(Action.ConnectionCreated);
export const disconnectWebSocket = createAction(Action.Disconnect);
export const webSocketDisconnected = createAction(Action.Disconnected);

export type WebSocketAction = ReturnType<
  | typeof createWebSocketConnection
  | typeof webSocketConnectionCreated
  | typeof disconnectWebSocket
  | typeof webSocketDisconnected
>;
