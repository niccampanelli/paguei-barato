export interface AuthUser {
    id: string;
    nome: string;
    email: string;
    criadoEm: string;
    cep?: string;
    sobrenome?: string;
}

export interface AuthTokens {
    token: string;
    refreshToken: string;
}

export interface AuthResponse extends AuthUser, AuthTokens {}

export type AuthStatus = "carregando" | "autenticado" | "nao_autenticado";
