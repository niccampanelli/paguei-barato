export default interface LoginResponse {
    nome: string;
    sobrenome: string;
    email: string;
    cep?: string;
    token: string;
}