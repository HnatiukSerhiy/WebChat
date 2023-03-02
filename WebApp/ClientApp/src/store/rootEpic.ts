import type { Epic } from 'redux-observable';
import { authenticationEpic } from 'behavior/authentication';
import { webSocketEpic } from 'behavior/webSocket';
import { messagesEpic } from 'behavior/messages';
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(
  authenticationEpic as Epic,
  webSocketEpic,
  messagesEpic,
) as Epic;

export default rootEpic;
