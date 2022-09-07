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
        paddingVertical: 20,
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
        fontWeight: "800",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    listaItemPreco: {
        fontWeight: "800",
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo,
        color: variaveisEstilo.cores.secundaria
    },

    listaObservacao: {
        fontSize: variaveisEstilo.tamanhoTextos.observacao,
        color: variaveisEstilo.cores.textoClaro,
        textAlign: "center"
    },
});