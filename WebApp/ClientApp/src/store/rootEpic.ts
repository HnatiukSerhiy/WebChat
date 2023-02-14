import type { Epic } from 'redux-observable';
import { authenticationEpic } from 'behavior/authentication';
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(authenticationEpic as Epic);

export default rootEpic;
