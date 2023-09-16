import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const alturaMapa = 280;

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: propriedadesTema.cores.fundoSecundario,
        },

        imagem: {
            padding: 16,
            alignSelf: "center",
            backgroundColor: "#ffffff",
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        itemImagem: {
            height: 160,
            aspectRatio: 1,
            resizeMode: "contain",
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        voltar: {
            position: "absolute",
            top: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            left: propriedadesTema.layout.paddingHorizontal,
            zIndex: 2
        },

        mapaContainer: {
            width: "100%",
            height: alturaMapa,
        },

        mapa: {
            width: "100%",
            height: "100%",
        },

        card: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            top: alturaMapa - 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
            elevation: 10,
        },

        cabecalho: {
            position: "relative",
            paddingTop: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            width: "100%",
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
            maxHeight: 460
        },

        listaConteudo: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
        },

        listaItem: {
            width: "48%",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            marginBottom: 10,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: propriedadesTema.layout.raioBorda
        },

        listaItemImagem: {
            resizeMode: "contain",
            width: "100%",
            marginBottom: 10,
            aspectRatio: 1,
            backgroundColor: "#ffffff",
            borderRadius: propriedadesTema.layout.raioBorda
        },

        listaItemInfos: {
            flex: 1,
            justifyContent: "flex-start",
            marginBottom: 10,
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