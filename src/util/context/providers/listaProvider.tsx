import { createContext, useContext, useState, useEffect } from "react";
import { ContextLista } from "../../../interfaces/context/ContextLista";
import ItemListaCompras from "../../../interfaces/models/ItemListaCompras";
import Sugestao from "../../../interfaces/models/Sugestao";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaContext = createContext<ContextLista>({ itensLista: [], adicionarItemLista: () => { }, adicionarSugestaoLista: () => { }, removerItemLista: () => { }, riscarItemLista: () => { }, verificarExistenteLista: () => false, verificarSugestaoExistenteLista: () => false });

export default function ListaProvider(props: any) {

    const [itensLista, setItensLista] = useState<ItemListaCompras[]>([]);

    useEffect(() => {
        const obterItensLista = async () => {
            const itensJson = await AsyncStorage.getItem("itensLista");
            const itens: ItemListaCompras[] = itensJson ? JSON.parse(itensJson) : [];

            setItensLista(itens);
        };

        obterItensLista();

        return () => {
            AsyncStorage.setItem("itensLista", JSON.stringify(itensLista));
        };
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("itensLista", JSON.stringify(itensLista));
    }, [itensLista]);

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

    const verificarExistenteLista = (item: ItemListaCompras) => {
        return itensLista.some(i => i.sugestao.id === item.sugestao.id);
    };

    const verificarSugestaoExistenteLista = (sugestao: Sugestao) => {
        return itensLista.some(i => i.sugestao.id === sugestao.id);
    };

    return (
        <ListaContext.Provider value={{ itensLista, adicionarItemLista, adicionarSugestaoLista, removerItemLista, riscarItemLista, verificarExistenteLista, verificarSugestaoExistenteLista }}>
            {props.children}
        </ListaContext.Provider>
    );
}

export const useListaContext = () => useContext(ListaContext);