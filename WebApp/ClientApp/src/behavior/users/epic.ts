import performGraphRequest from 'api/performGraphRequest';
import type { Epic } from 'store/types';
import type { UserGetAllResponse, UserSearchResponse } from './types';
import { getAllUsers, searchUser, type UsersAction } from './actions';
import { filter, map, merge, mergeMap } from 'rxjs';
import { getAllUsersQuery, searchUserQuery } from './queries';
import { pushLoadedUsers, pushSearchedUsers } from './slice';

const epic: Epic<UsersAction> =  action$ => {
  const searchUser$ = action$.pipe(
    filter(searchUser.match),
    map(action => action.payload),
    mergeMap (payload => {
      return performGraphRequest<UserSearchResponse>(searchUserQuery, { input: payload }).pipe(
        map(response => pushSearchedUsers(response.user.searchByName)),
      );
    }),
  );

  const getAllUsers$ = action$.pipe(
    filter(getAllUsers.match),
    mergeMap(() => {
      return performGraphRequest<UserGetAllResponse>(getAllUsersQuery).pipe(
        map(response => {
          return pushLoadedUsers(response.user.getAll);
        }),
      );
    }),
  );

  return merge(searchUser$, getAllUsers$);
};

export default epic;
