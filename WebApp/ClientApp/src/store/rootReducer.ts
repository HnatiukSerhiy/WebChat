import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'behavior/authentication';

const rootReducer = combineReducers({
    user: userSlice.reducer,
});

export default rootReducer;
