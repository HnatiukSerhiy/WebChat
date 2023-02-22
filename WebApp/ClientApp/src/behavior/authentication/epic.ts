import type { Epic } from 'store/types';
import type { RefreshTokenResponse, UserLoginResponse, UserRegisterResponse } from './types';
import { loginUserMutation, logoutUserMutation, refreshTokenMutation, registerUserMutation } from './queries';
import { type AuthenticationAction, registerUser, loginUser, logoutUser, refreshToken } from './actions';
import { filter, map, merge, mergeMap } from 'rxjs';
import { pushUser, removeUser } from './slice';
import performGraphRequest from 'api/performGraphRequest';

const authenticationEpic: Epic<AuthenticationAction> = action$ => {
  const registerUser$ = action$.pipe(
      filter(registerUser.match),
      map(action => action.payload),
      mergeMap(payload => performGraphRequest<UserRegisterResponse>(registerUserMutation, { input: payload }).pipe(
              map(response => {
                  const { user, accessToken, refreshToken } = response.authentication.register;

                  localStorage.setItem('AccessToken', accessToken);
                  localStorage.setItem('RefreshToken', refreshToken);

                  return pushUser(user);
              }),
          ),
      ),
  );

  const loginUser$ = action$.pipe(
    filter(loginUser.match),
    map(action => action.payload),
    mergeMap(payload => performGraphRequest<UserLoginResponse>(loginUserMutation, { input: payload }).pipe(
          map(response => {
              const { user, accessToken, refreshToken } = response.authentication.login;
              localStorage.setItem('AccessToken', accessToken);
              localStorage.setItem('RefreshToken', refreshToken);

              return pushUser(user);
          }),
        ),
    ),
  );

  const logoutUser$ = action$.pipe(
    filter(logoutUser.match),
    mergeMap(() => performGraphRequest(logoutUserMutation).pipe(map(() => {
          localStorage.removeItem('AccessToken');
          localStorage.removeItem('RefreshToken');

          return removeUser();
        }),
      ),
    ),
  );

  const refreshToken$ = action$.pipe(
      filter(refreshToken.match),
      mergeMap(() => performGraphRequest<RefreshTokenResponse>(refreshTokenMutation).pipe(
              map(response => {
                  const { accessToken, refreshToken } = response.authentication.refresh;

                  localStorage.setItem('AccessToken', accessToken);
                  localStorage.setItem('RefreshToken', refreshToken);

                  return removeUser();
              }),
          ),
      ),
  );

  return merge(registerUser$, loginUser$, logoutUser$, refreshToken$);
};

export default authenticationEpic;
