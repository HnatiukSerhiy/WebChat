import type { Epic } from 'store/types';
import type { SendMessageResponse } from './types';
import { type MessagesAction, sendMessage } from './actions';
import { messageReceived } from './slice';
import { filter, map, merge, mergeMap } from 'rxjs';
import { sendMessageMutation } from './queries';
import performGraphRequest from 'api/performGraphRequest';

const epic: Epic<MessagesAction> = action$ => {
  const sendMessage$ = action$.pipe(
    filter(sendMessage.match),
    map(action => action.payload),
    mergeMap(payload => performGraphRequest<SendMessageResponse>(sendMessageMutation, { input: payload }).pipe(
      map(response => messageReceived(response.messages.send)),
    )),
  );

  return merge(sendMessage$);
};

export default epic;
