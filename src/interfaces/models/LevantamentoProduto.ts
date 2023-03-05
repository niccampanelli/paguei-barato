import Produto from "./Produto";

export default interface LevantamentoProduto extends Produto {
    precoMedio: number,
    menorPreco: number,
    maiorPreco: number,
    quantidadeSugestoes: number,
    dataUltimaSugestao: Date
}