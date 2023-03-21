import { createAction } from '@reduxjs/toolkit';

enum Action {
  Search = 'user/search',
}

export const searchUser = createAction<string>(Action.Search);
