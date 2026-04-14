export default interface CadastrarResponse {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    cep?: string;
    token: string;
}