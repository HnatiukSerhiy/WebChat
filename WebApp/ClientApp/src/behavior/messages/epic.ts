import type { Epic } from 'store/types';
import type { GetChatsResponse, SendMessageResponse } from './types';
import { type MessagesAction, sendMessage, getChats } from './actions';
import { chatsLoaded, messageReceived } from './slice';
import { filter, map, merge, mergeMap } from 'rxjs';
import { getChatsQuery, sendMessageMutation } from './queries';
import performGraphRequest from 'api/performGraphRequest';

const epic: Epic<MessagesAction> = action$ => {
  const sendMessage$ = action$.pipe(
    filter(sendMessage.match),
    map(action => action.payload),
    mergeMap(payload => performGraphRequest<SendMessageResponse>(sendMessageMutation, { input: payload }).pipe(
      map(response => messageReceived(response.messages.send)),
    )),
  );

  const getChats$ = action$.pipe(
    filter(getChats.match),
    map(action => action.payload),
    mergeMap(payload => performGraphRequest<GetChatsResponse>(getChatsQuery, { input: payload }).pipe(
      map(response => chatsLoaded(response.messages)),
    )),
  );

  return merge(sendMessage$, getChats$);
};

export default epic;
