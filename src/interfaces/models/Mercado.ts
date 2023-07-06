import Ramo from "./Ramo"
import UF from "./UF"

export default interface Mercado {
    id?: number,
    nome: string,
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    cidade: string,
    uf: UF,
    cep: string,
    ramoId: number,
    ramo?: Ramo
}