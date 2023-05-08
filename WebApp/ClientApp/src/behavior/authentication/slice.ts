import type { User, UserState } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = null as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        pushUser: (_, action: PayloadAction<User>) => action.payload,
        removeUser: () => initialState,
    },
});

export const {
    pushUser,
    removeUser,
} = userSlice.actions;

export default userSlice;
