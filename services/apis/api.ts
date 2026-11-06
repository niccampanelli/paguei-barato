import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
    encerrarSessao,
    obterAccessToken,
    renovarAccessToken,
} from "../authSession";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!config.requiresAuth)
        return config;

    const token = obterAccessToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as
            | (InternalAxiosRequestConfig & { _retry?: boolean })
            | undefined;
        const status = error.response?.status;

        if (status !== 401 || !request || !request.requiresAuth || request._retry)
            return Promise.reject(error);

        request._retry = true;
        refreshPromise ??= renovarAccessToken().finally(() => {
            refreshPromise = null;
        });

        const token = await refreshPromise;
        if (!token) {
            await encerrarSessao();
            return Promise.reject(error);
        }

        request.headers.Authorization = `Bearer ${token}`;
        return api(request);
    },
);

export default api;