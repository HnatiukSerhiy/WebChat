import { exhaustMap, from, map, Observable } from 'rxjs';
import { buildRequestParams } from './buildRequestParams';
import { ApiResponse } from './types';

const performGraphRequest = <T>(query: string, variables?: unknown, headers?: Record<string, string>): Observable<T> => {
    const { url, body, headers: buildedHeaders } = buildRequestParams(query, variables, headers);

    const requestInit: RequestInit = {
        method: 'POST',
        body,
        headers: buildedHeaders,
    };

    return from(fetch(url, requestInit)).pipe(
        exhaustMap(response => from(response.json()).pipe(
            map((json: ApiResponse<T>) => json.data),
        )),
    );
};

export default performGraphRequest;
