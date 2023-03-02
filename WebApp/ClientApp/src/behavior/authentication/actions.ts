import { createAction } from '@reduxjs/toolkit';
import type { UserRegisterInput, UserLoginInput } from './types';

enum Action {
  RegisterUser = 'user/register',
  LoginUser = 'user/login',
  RefreshToken = 'token/refresh',
  LogoutUser = 'user/logout',
}

export const registerUser = createAction<UserRegisterInput>(Action.RegisterUser);
export const loginUser = createAction<UserLoginInput>(Action.LoginUser);
export const refreshToken = createAction(Action.RefreshToken);
export const logoutUser = createAction(Action.LogoutUser);

export type AuthenticationAction = ReturnType<
  | typeof registerUser
  | typeof refreshToken
  | typeof logoutUser
  | typeof loginUser
>;
