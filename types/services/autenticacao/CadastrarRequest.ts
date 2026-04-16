export interface CadastrarRequest {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    cep?: string;
}