import type { User } from 'behavior/authentication/types';

export type UsersState = {
  searchedUsers: User[];
  users: User[];
};

export type UserSearchResponse = {
  user: {
    searchByName: User[];
  };
};

export type UserGetAllResponse = {
  user: {
    getAll: User[];
  };
};
