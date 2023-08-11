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
            display: "flex",
            flex: 1
        },

        listaItem: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 16
        },

        listaItemImagemContainer: {
            backgroundColor: "#ffffff",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
        },

        listaItemImagem: {
            height: 30,
            width: 30,
            borderRadius: 8,
        },

        listaItemInfos: {
            flex: 1,
        },

        listaItemTexto: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemPreco: {
            alignSelf: "flex-start",
            textAlign: "right",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemMercado: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoClaro
        },

        listaObservacao: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            color: propriedadesTema.cores.textoClaro,
            textAlign: "center"
        },
    });

    return { estilos };
};