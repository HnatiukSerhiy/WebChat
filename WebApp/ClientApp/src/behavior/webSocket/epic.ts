import { filter, map, merge, Subject, switchMap, takeUntil } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Epic } from 'store/types';
import { createSocketConnection } from './actions';

// const socket$ = webSocket('wss://localhost:7098/graphql');

const epic: Epic<any> = action$ => {
  return action$.pipe(
    filter(createSocketConnection.match),
    switchMap(() => {
      const openObserver$ = new Subject();
      const closeObserver$ = new Subject();

      const open$ = openObserver$.pipe(map(event => ({
        type: 'SOCKET_CONNECTED',
      })));

      const close$ = closeObserver$.pipe(map(event => ({
        type: 'SOCKET_DISCONNECTED',
      })));

      const options = {
        url: 'wss://localhost:7098/graphql',
        openObserver: openObserver$,
        closeObserver: openObserver$,
      };

      const msg$ = webSocket(options).pipe(map(response => ({ type: 'RECEIVED_MESSAGE', payload: response })));

      return merge(open$, close$, msg$).pipe(
        takeUntil(action$.pipe(
          filter(createSocketConnection.match),
          ),
        ),
      );
    }),
  );
};


export default epic;
