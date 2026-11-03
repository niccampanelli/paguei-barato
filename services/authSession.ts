let accessToken: string | null = null;
let refreshAccessTokenHandler: (() => Promise<string | null>) | null = null;
let clearSessionHandler: (() => Promise<void>) | null = null;

export function obterAccessToken(): string | null {
    return accessToken;
}

export function definirAccessToken(token: string | null): void {
    accessToken = token;
}

export function configurarSessao(
    refreshHandler: () => Promise<string | null>,
    clearHandler: () => Promise<void>,
): void {
    refreshAccessTokenHandler = refreshHandler;
    clearSessionHandler = clearHandler;
}

export async function renovarAccessToken(): Promise<string | null> {
    if (!refreshAccessTokenHandler)
        return null;

    return refreshAccessTokenHandler();
}

export async function encerrarSessao(): Promise<void> {
    accessToken = null;
    if (clearSessionHandler)
        await clearSessionHandler();
}
