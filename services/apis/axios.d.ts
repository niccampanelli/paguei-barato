import "axios";

declare module "axios" {
    interface AxiosRequestConfig {
        requiresAuth?: boolean;
    }
}
