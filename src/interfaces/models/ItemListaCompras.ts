import Sugestao from "./Sugestao";

export default interface ItemListaCompras {
    sugestao: Sugestao;
    adicionadoEm: Date;
    riscado: boolean;
}