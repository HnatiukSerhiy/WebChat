import { createAction } from '@reduxjs/toolkit';

enum Action {
  Search = 'user/search',
  GetAll = 'user/get/all',
}

export const searchUser = createAction<string>(Action.Search);
export const getAllUsers = createAction(Action.GetAll);

export type UsersAction = ReturnType<
  | typeof searchUser
  | typeof getAllUsers
>;
