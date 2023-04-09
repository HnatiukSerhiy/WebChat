import { ApiRequestParams } from './types';

export const buildRequestParams = (query: string, variables?: unknown, headers?: Record<string, string>): ApiRequestParams => {
    const url = process.env.REACT_APP_API_URL!;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    };
    const accessToken = localStorage.getItem('AccessToken');

    if (accessToken) {
        defaultHeaders['Authorization'] = 'Bearer ' + accessToken;
    }

    return {
        url,
        body: JSON.stringify({ query, variables }),
        headers: defaultHeaders,
    };
};
