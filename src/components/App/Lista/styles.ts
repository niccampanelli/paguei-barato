import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    cabecalho: {
    },

    resumo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16
    },

    listaFiltros: {
        display: "flex",
        paddingVertical: 16
    },

    filtro: {
        marginRight: 10
    },

    filtroContador: {
        marginLeft: variaveisEstilo.botoes.espacamento
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
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    listaItemMercado: {
        flex: 1,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoClaro
    },

    listaFooter: {
        position: "relative",
        paddingVertical: 10
    },

    adicionarFlutuante: {
        position: "absolute",
        backgroundColor: variaveisEstilo.cores.secundaria,
        padding: 10,
        borderRadius: variaveisEstilo.layout.raioBorda,
        zIndex: 1,
        right: 10,
        top: "-220%"
    },

    adicionarFlutuanteIcone: {
        fontSize: 34,
        color: "#ffffff"
    },

    listaObservacao: {
        fontSize: variaveisEstilo.tamanhoTextos.observacao,
        color: variaveisEstilo.cores.textoClaro,
        textAlign: "center"
    }
});