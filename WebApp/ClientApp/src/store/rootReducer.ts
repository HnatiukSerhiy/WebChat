import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'behavior/authentication';
import { messagesSlice } from 'behavior/messages';
import usersSlice from 'behavior/users/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  messages: messagesSlice.reducer,
  users: usersSlice.reducer,
});

export default rootReducer;
