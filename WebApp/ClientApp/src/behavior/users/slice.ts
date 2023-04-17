import type { User } from 'behavior/authentication/types';
import type { UsersState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: UsersState = {
  searchedUsers: [],
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pushSearchedUsers: (state, action: PayloadAction<User[]>) => ({ ...state, searchedUsers: action.payload }),
    pushLoadedUsers: (state, action: PayloadAction<User[]>) => ({ ...state, users: action.payload }),
  },
});

export const {
  pushSearchedUsers,
  pushLoadedUsers,
} = usersSlice.actions;

export default usersSlice;
