import type { User, UserState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = null as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        pushUser: (state: UserState, action: PayloadAction<User>) => {
            state = action.payload;
        },
        removeUser: () => initialState,
    },
});

export const {
    pushUser,
    removeUser,
} = userSlice.actions;

export default userSlice;
