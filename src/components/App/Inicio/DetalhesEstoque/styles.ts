import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../../variaveisEstilo";

export default StyleSheet.create({

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
        top: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical,
        left: variaveisEstilo.layout.paddingHorizontal,
        zIndex: 2
    },

    cabecalho: {
        position: "relative",
        paddingTop: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical
    },

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical + 40,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
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
        fontWeight: "800",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    informacaoTexto: {
        fontWeight: "400",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    lista: {
        maxHeight: 400
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

    listaItemInfos: {
        flex: 1,
    },

    listaItemTexto: {
        flex: 1,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    listaItemPreco: {
        alignSelf: "flex-start",
        textAlign: "right",
        fontWeight: "600",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    listaItemMercado: {
        flex: 1,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoClaro
    },

    listaObservacao: {
        fontSize: variaveisEstilo.tamanhoTextos.observacao,
        color: variaveisEstilo.cores.textoClaro,
        textAlign: "center"
    },
});