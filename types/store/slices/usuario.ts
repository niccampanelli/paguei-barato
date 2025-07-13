export interface UsuarioState {
    nome: string;
    sobrenome: string;
    nomeCompleto: string;
    email?: string;
    logado: boolean;
    cep?: string;
    token?: string;
}