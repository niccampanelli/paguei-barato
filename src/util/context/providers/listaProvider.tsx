import { createContext, useContext, useState } from "react";
import { ContextLista } from "../../../interfaces/context/ContextLista";
import ItemListaCompras from "../../../interfaces/models/ItemListaCompras";
import Sugestao from "../../../interfaces/models/Sugestao";

const ListaContext = createContext<ContextLista>({ itensLista: [], adicionarItemLista: () => { }, adicionarSugestaoLista: () => { }, removerItemLista: () => { }, riscarItemLista: () => { } });

export default function ListaProvider(props: any) {

    const [itensLista, setItensLista] = useState<ItemListaCompras[]>([]);

    const adicionarItemLista = (item: ItemListaCompras) => {
        item.adicionadoEm = new Date();
        item.riscado = false;

        setItensLista((itensLista) => [...itensLista, item]);
    };

    const adicionarSugestaoLista = (sugestao: Sugestao) => {
        const item: ItemListaCompras = {
            adicionadoEm: new Date(),
            riscado: false,
            sugestao
        };

        setItensLista((itensLista) => [...itensLista, item]);
    };

    const removerItemLista = (item: ItemListaCompras) => {
        setItensLista((itensLista) => itensLista.filter(i => i.sugestao.id !== item.sugestao.id));
    };

    const riscarItemLista = (item: ItemListaCompras) => {
        setItensLista((itensLista) => itensLista.map(i => i.sugestao.id === item.sugestao.id ? { ...i, riscado: !i.riscado } : i))
    };

    return (
        <ListaContext.Provider value={{ itensLista, adicionarItemLista, adicionarSugestaoLista, removerItemLista, riscarItemLista }}>
            {props.children}
        </ListaContext.Provider>
    );
}

export const useListaContext = () => useContext(ListaContext);