import Estoque from "./Estoque";

export default interface Sugestao {
    id?: number,
    preco: number,
    timestamp: Date,
    estoqueId: number,
    estoque?: Estoque
}