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

        botaoAdicionarView: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },
    });

    return { estilos };
};