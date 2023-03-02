import type { Epic } from 'store/types';
import {
  type WebSocketAction,
  createWebSocketConnection,
  webSocketDisconnected,
  disconnectWebSocket,
} from './actions';
import { filter, map, merge, switchMap } from 'rxjs';
import { messageReceived } from 'behavior/messages';
import WebSocketProvider from './webSocketProvider';
import { messagesSubscription } from './queries';

const webSocketProvider = new WebSocketProvider();

const epic: Epic<WebSocketAction> = action$ => {
  const socket$ = webSocketProvider.createWebSocket('wss://localhost:7098/graphql');

  const connection$ = action$.pipe(
    filter(createWebSocketConnection.match),
    map(action => action.payload),
    switchMap(({ userId }) => {
      const operation = {
        type: 'start',
        id: '1',
        payload: {
          operationName: 'msgs',
          query: messagesSubscription,
          variables: { userId },
        },
      };

      socket$.next({ type: 'connection_init', payload: {} });
      socket$.next(operation);

      return socket$.pipe(
        map(data => {
          console.log(data);
          return messageReceived({ message: 'YES' });
        }),
      );
  }));

  const disconnection$ = action$.pipe(
    filter(disconnectWebSocket.match),
    map(() => {
      webSocketProvider.closeObserver.complete();
      webSocketProvider.openObserver.complete();
      return webSocketDisconnected();
    }),
  );

  return merge(connection$, disconnection$);
};

export default epic;
