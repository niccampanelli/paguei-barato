import ItemListaCompras from "../models/ItemListaCompras"
import Sugestao from "../models/Sugestao";

export type ContextLista = {
    itensLista: ItemListaCompras[];
    adicionarItemLista: (item: ItemListaCompras) => void;
    adicionarSugestaoLista: (item: Sugestao) => void;
    removerItemLista: (item: ItemListaCompras) => void;
}