import type { ApiResponse } from './types';
import { buildRequestParams } from './buildRequestParams';
import { Observable, exhaustMap, from, map } from 'rxjs';

const performGraphRequest = <TResponse>(query: string, variables?: unknown, headers?: Record<string, string>): Observable<TResponse> => {
  const { url, body, headers: requestHeaders } = buildRequestParams(query, variables, headers);

  const requestInit: RequestInit = {
    method: 'POST',
    body,
    headers: requestHeaders,
  };

  return from(fetch(url, requestInit)).pipe(
    exhaustMap(response => from(response.json()).pipe(
      map((respone: ApiResponse<TResponse>) => respone.data),
    )),
  );
};

export default performGraphRequest;
