export interface UsuarioState {
    nome: string;
    email?: string;
    logado: boolean;
    cep?: string;
    token?: string;
}