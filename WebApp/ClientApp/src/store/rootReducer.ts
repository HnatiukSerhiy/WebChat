import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'behavior/authentication';
import { messagesSlice } from 'behavior/messages';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  messages: messagesSlice.reducer,
});

export default rootReducer;
