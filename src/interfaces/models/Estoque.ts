import Mercado from "./Mercado";
import Produto from "./Produto";

export default interface Estoque {
    id?: number,
    criadoPor?: number,
    produtoId: number,
    produto?: Produto,
    mercadoId: number,
    mercado?: Mercado
}