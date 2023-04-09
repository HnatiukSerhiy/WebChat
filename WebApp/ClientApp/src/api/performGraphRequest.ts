import type { RefreshTokenResponse } from 'behavior/authentication/types';
import type { ApiResponse } from './types';
import { refreshTokenMutation } from '../behavior/authentication/queries';
import { buildRequestParams } from './buildRequestParams';
import { Observable } from 'rxjs';

const performGraphRequest = <T>(query: string, variables?: unknown, headers?: Record<string, string>): Observable<T> => {
  const { url, body, headers: requestHeaders } = buildRequestParams(query, variables, headers);

  const requestInit: RequestInit = {
    method: 'POST',
    body,
    headers: requestHeaders,
  };

  return new Observable<T>(subscriber => {
    fetch(url, requestInit)
      .then(response => response.json())
      .then((json: ApiResponse<T>) => {
        subscriber.next(json.data);
        subscriber.complete();
      });
  });
};

export default performGraphRequest;

const handleResponse = (response: Response, requestInit: RequestInit): Response => {
  if (response.status === 401) {
    const observable = performRefreshResponse();

    observable.subscribe({
      next(resfreshResponse) {
        const { accessToken, refreshToken } = resfreshResponse.authentication.refresh;

        localStorage.setItem('AccessToken', accessToken);
        localStorage.setItem('RefreshToken', refreshToken);

        return new Observable<Response>(subscriber => {
          fetch(response.url, requestInit)
            .then(res => {
              subscriber.next(res);
              subscriber.complete();
            });
        });
      },
    });
  }

  return response;
};

const performRefreshResponse = (): Observable<RefreshTokenResponse> => {
  const { url, body, headers } = buildRequestParams(refreshTokenMutation);

  const requestInit: RequestInit = {
    method: 'POST',
    body,
    headers,
  };

  return new Observable(subscriber => {
    fetch(url, requestInit)
      .then(response => response.json())
      .then((json: ApiResponse<RefreshTokenResponse>) => {
        subscriber.next(json.data);
        subscriber.complete();
      });
  });
};
