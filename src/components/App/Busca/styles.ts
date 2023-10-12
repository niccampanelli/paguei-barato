import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        container: {
            flex: 1,
            paddingTop: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
        },

        cabecalho: {
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            marginBottom: 16
        },

        filtros: {
            flexGrow: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: propriedadesTema.botoes.espacamento,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        listaFiltrosContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: propriedadesTema.botoes.espacamento,
        },

        filtroContador: {
            marginLeft: propriedadesTema.botoes.espacamento
        },

        listaCabecalho: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        lista: {
            flex: 1,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        listaContainer: {
            flexGrow: 1,
            paddingVertical: 8
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
            borderRadius: 8,
            height: 30,
            width: 30
        },

        listaItemInfos: {
            display: "flex",
            flexDirection: "column",
        },

        listaItemTexto: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemTipo: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoClaro
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