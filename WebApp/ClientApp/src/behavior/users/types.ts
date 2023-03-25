import type { User } from 'behavior/authentication/types';

export type UsersState = User[];

export type UserSearchResponse = {
  user: {
    search: User[];
  };
};
