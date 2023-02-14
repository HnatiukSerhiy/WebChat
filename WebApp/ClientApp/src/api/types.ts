export type ApiResponse<T> = {
    data: T;
};

export type ApiRequestParams = {
    url: string;
    body: string;
    headers: Record<string, string>;
};
