import performGraphRequest from 'api/performGraphRequest';
import type { Epic } from 'store/types';
import type { UserSearchResponse } from './types';
import { searchUser, type UsersAction } from './actions';
import { filter, map, merge, mergeMap } from 'rxjs';
import { searchUserQuery } from './queries';
import { pushUsers } from './slice';

const epic: Epic<UsersAction> =  action$ => {
  const search$ = action$.pipe(
    filter(searchUser.match),
    mergeMap(action => {
      return performGraphRequest<UserSearchResponse>(searchUserQuery, { input: action.payload }).pipe(
        map(response => pushUsers(response.user.search)),
      );
    }),
  );

  return merge(search$);
};

export default epic;
