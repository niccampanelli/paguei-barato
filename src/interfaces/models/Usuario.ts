import UF from "./UF"

export default interface Usuario {
    id?: number,
    nome: string,
    email: string,
    senha: string,
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    cidade: string,
    uf: UF,
    cep: string
}