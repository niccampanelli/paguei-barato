export interface UsuarioState {
    id?: string;
    nome: string;
    sobrenome: string;
    nomeCompleto: string;
    email?: string;
    logado: boolean;
    cep?: string;
    token?: string;
}