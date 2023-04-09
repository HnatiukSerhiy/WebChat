import performGraphRequest from 'api/performGraphRequest';
import type { Epic } from 'store/types';
import type { UserSearchResponse } from './types';
import { searchUser, type UsersAction } from './actions';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { searchUserQuery } from './queries';
import { pushUsers } from './slice';

const epic: Epic<UsersAction> =  action$ => {
  return action$.pipe(
    filter(searchUser.match),
    map(action => action.payload),
    mergeMap (payload => {
      console.log('action');
      return performGraphRequest<UserSearchResponse>(searchUserQuery, { input: payload }).pipe(
        map(response => pushUsers(response.user.search)),
      );
    }),
  );
};

export default epic;
