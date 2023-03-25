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
        map((data: any) => {
          const payload = {
            message: data.newMessages.messages,
            chatId: data.newMessages.chatId,
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
