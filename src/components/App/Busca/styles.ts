import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        container: {
            flex: 1,
            paddingTop: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        listaFiltros: {
            display: "flex",
            paddingVertical: 16
        },

        filtro: {
            marginRight: 10
        },

        filtroContador: {
            marginLeft: propriedadesTema.botoes.espacamento
        },

        listaCabecalho: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
        },

        lista: {
            flex: 1
        },

        listaItem: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 16
        },

        listaItemImagem: {
            marginRight: 20,
            height: 30,
            width: 30
        },

        listaItemTexto: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        modalScrollview: {
            flex: 1,
        },

        modalSubtitulo: {
            marginBottom: 10
        },

        modalSecao: {
            marginTop: 6,
        },

        modalOpcoes: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1
        },

        modalOpcao: {
            alignSelf: "flex-start",
            marginBottom: 10,
        }
    });

    return { estilos };
};