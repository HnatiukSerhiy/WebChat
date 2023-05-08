import type { Epic } from 'store/types';
import {
  type WebSocketAction,
  createWebSocketConnection,
  webSocketDisconnected,
  disconnectWebSocket,
} from './actions';
import { filter, map, merge, switchMap } from 'rxjs';
import { messageReceived } from 'behavior/messages';
import { messagesSubscription } from './queries';
import WebSocketProvider from './webSocketProvider';
import { createConnectionInitOperation, createStartSubscriptionOperation } from './helpers';

const webSocketProvider = new WebSocketProvider();

const epic: Epic<WebSocketAction> = action$ => {
  const socket$ = webSocketProvider.createWebSocket('wss://localhost:7098/graphql');

  const connection$ = action$.pipe(
    filter(createWebSocketConnection.match),
    map(action => action.payload),
    switchMap(({ userId }) => {
      const initConnectionOperation = createConnectionInitOperation();
      const subscriptionStartOperation = createStartSubscriptionOperation(messagesSubscription, { userId });

      socket$.next(initConnectionOperation);
      socket$.next(subscriptionStartOperation);

      return socket$.pipe(
        filter((response: any) => response.type === 'data'),
        map((response: any) => {
          const { id, receiverId, senderId, value, currentUserId } = response.payload.data.newMessages;
          const payload = {
            id,
            value,
            receiverId,
            senderId,
            currentUserId,
          };

          return messageReceived(payload);
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
