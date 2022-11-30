import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
        },

        itemImagem: {
            width: "100%",
            height: 200,
            resizeMode: "contain"
        },

        voltar: {
            position: "absolute",
            top: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            left: propriedadesTema.layout.paddingHorizontal,
            zIndex: 2
        },

        cabecalho: {
            position: "relative",
            paddingTop: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical
        },

        container: {
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        secao: {
            paddingBottom: 16
        },

        tags: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 16,
        },

        tag: {
        },

        titulo: {
            paddingBottom: 16,
        },

        informacao: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 10,
        },

        informacaoTitulo: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        informacaoTexto: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        lista: {
            maxHeight: 460
        },

        listaConteudo: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
        },

        listaItem: {
            width: "46%",
            display: "flex",
            flexDirection: "column",
            paddingBottom: 40
        },

        listaItemImagem: {
            resizeMode: "contain",
            width: "100%",
            height: 100
        },

        listaItemInfos: {
            flex: 1,
            justifyContent: "center"
        },

        listaItemTexto: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemPreco: {
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
            color: propriedadesTema.cores.secundaria
        },

        listaObservacao: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            color: propriedadesTema.cores.textoClaro,
            textAlign: "center"
        },
    });

    return { estilos };
};