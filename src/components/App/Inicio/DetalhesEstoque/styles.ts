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
        paddingTop: 20,
        paddingBottom: variaveisEstilo.layout.paddingVertical + variaveisEstilo.tamanhoTextos.texto + variaveisEstilo.layout.paddingHorizontal,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    secao: {
        paddingBottom: 16
    },

    secaoBotao: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        marginBottom: variaveisEstilo.layout.paddingHorizontal,
    },

    tags: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 16,
    },

    tag: {
    },

    preco: {
        fontWeight: "800",
        fontSize: variaveisEstilo.tamanhoTextos.titulo,
        color: variaveisEstilo.cores.secundaria,
    },

    titulo: {
        marginBottom: 16
    },

    tituloIcone: {
        fontSize: variaveisEstilo.tamanhoTextos.titulo,
        color: variaveisEstilo.cores.textoEscuro,
        alignSelf: "baseline"
    },

    mercadoCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
        padding: 20,
        marginBottom: 16
    },

    mercadoCardImagem: {
        marginRight: 20,
        height: 30,
        width: 30
    },

    mercadoCardIcone: {
        marginLeft: "auto",
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo,
        color: variaveisEstilo.cores.textoEscuro,
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

    botaoAdicionarView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        backgroundColor: variaveisEstilo.cores.fundoPrincipal,
    },

    botaoAdicionarPreco: {
        flexDirection: "row",
        alignItems: "center",
    },

    botaoAdicionarPrecoTexto: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        color: "#000000",
        marginRight: 16
    }
});