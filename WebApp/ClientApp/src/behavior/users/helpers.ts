import performGraphRequest from 'api/performGraphRequest';
import { User } from 'behavior/authentication/types';
import { map } from 'rxjs';
import { getAllUsersQuery } from './queries';
import { UserGetAllResponse } from './types';

export const getUsers = (onSubscribe: (users: User[]) => void) => {
  const observable = performGraphRequest<UserGetAllResponse>(getAllUsersQuery).pipe(
    map(response => response.user.getAll),
  );
  observable.subscribe(onSubscribe);
};
