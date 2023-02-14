import { createAction } from '@reduxjs/toolkit';
import { AuthenticationActionEnum } from './enums';
import type { UserRegisterInput, UserLoginInput } from './types';

export const registerUser = createAction<UserRegisterInput>(AuthenticationActionEnum.RegisterUser);
export const loginUser = createAction<UserLoginInput>(AuthenticationActionEnum.LoginUser);
export const refreshToken = createAction(AuthenticationActionEnum.RefreshToken);
export const logoutUser = createAction(AuthenticationActionEnum.LogoutUser);

export type AuthenticationAction = ReturnType<
    | typeof registerUser
    | typeof refreshToken
    | typeof logoutUser
    | typeof loginUser
>;
