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
            paddingTop: 20,
            paddingBottom: propriedadesTema.layout.paddingVertical + propriedadesTema.tamanhoTextos.texto + propriedadesTema.layout.paddingHorizontal,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        secao: {
            paddingBottom: 16
        },

        secaoBotao: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            marginBottom: propriedadesTema.layout.paddingHorizontal,
        },

        tags: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 16,
        },

        tag: {
        },

        preco: {
            fontSize: propriedadesTema.tamanhoTextos.titulo,
            color: propriedadesTema.cores.secundaria,
        },

        titulo: {
            marginBottom: 16
        },

        tituloIcone: {
            fontSize: propriedadesTema.tamanhoTextos.titulo,
            color: propriedadesTema.cores.textoEscuro,
            alignSelf: "baseline"
        },

        mercadoCard: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 20,
            marginBottom: 16
        },

        mercadoCardImagem: {
            marginRight: 20,
            height: 30,
            width: 30,
            borderRadius: 5,
        },

        mercadoCardIcone: {
            marginLeft: "auto",
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
            color: propriedadesTema.cores.textoEscuro,
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

        botaoAdicionarView: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },

        botaoAdicionarPreco: {
            flexDirection: "row",
            alignItems: "center",
        },

        botaoAdicionarPrecoTexto: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: "#000000",
            marginRight: 16
        }
    });

    return { estilos };
};