import Estoque from "./Estoque";
import Produto from "./Produto";

export default interface EstoqueProduto extends Produto {
    estoqueId: number,
    estoque?: Estoque
}