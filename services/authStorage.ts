import * as SecureStore from "expo-secure-store";
import { AuthUser } from "@/types/services/autenticacao/AuthSession";

const REFRESH_TOKEN_KEY = "paguei-barato.refresh-token";
const USER_KEY = "paguei-barato.user";

export async function obterRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function salvarSessao(refreshToken: string, usuario: AuthUser): Promise<void> {
    await Promise.all([
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(usuario)),
    ]);
}

export async function obterUsuario(): Promise<AuthUser | null> {
    const valor = await SecureStore.getItemAsync(USER_KEY);
    if (!valor)
        return null;

    try {
        return JSON.parse(valor) as AuthUser;
    } catch {
        await SecureStore.deleteItemAsync(USER_KEY);
        return null;
    }
}

export async function limparSessao(): Promise<void> {
    await Promise.all([
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
    ]);
}
