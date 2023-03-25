import type { Epic } from 'redux-observable';
import { authenticationEpic } from 'behavior/authentication';
import { webSocketEpic } from 'behavior/webSocket';
import { messagesEpic } from 'behavior/messages';
import { combineEpics } from 'redux-observable';
import usersEpic from 'behavior/users/epic';

const rootEpic = combineEpics(
  authenticationEpic as Epic,
  usersEpic as Epic,
  webSocketEpic,
  messagesEpic,
) as Epic;

export default rootEpic;
