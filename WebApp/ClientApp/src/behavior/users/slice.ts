import type { User } from 'behavior/authentication/types';
import type { UsersState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: UsersState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pushUsers: (state, action: PayloadAction<User[]>) => action.payload,
  },
});

export const {
  pushUsers,
} = usersSlice.actions;

export default usersSlice;
