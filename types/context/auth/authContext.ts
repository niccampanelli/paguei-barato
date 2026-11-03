import { AuthStatus, AuthUser } from "@/types/services/autenticacao";

export interface AuthContextType {
    status: AuthStatus;
    usuario: AuthUser | null;
    accessToken: string | null;
    entrar: (email: string, senha: string) => Promise<void>;
    cadastrar: (dados: { nome: string; sobrenome: string; email: string; senha: string; cep?: string }) => Promise<void>;
    sair: () => Promise<void>;
    exigirAutenticacao: () => boolean;
}