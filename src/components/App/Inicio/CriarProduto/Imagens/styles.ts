import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            paddingTop: Constants.statusBarHeight,
        },

        voltar: {
            position: "absolute",
            top: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            left: propriedadesTema.layout.paddingHorizontal,
            zIndex: 2
        },

        container: {
            flex: 1,
            paddingTop: (propriedadesTema.layout.paddingVertical * 2) + 16,
        },

        cabecalho: {
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            paddingBottom: 10,
        },

        lista: {
            flex: 1,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
        },

        listaItem: {
            position: "relative",
            backgroundColor: "#ffffff",
            width: "49%",
            aspectRatio: 1,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 10
        },

        listaItemSelecionadoBadge: {
            position: "absolute",
            right: 15,
            top: 15,
            zIndex: 1
        },

        listaItemImagem: {
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        botaoAdicionarView: {
            paddingVertical: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },
    });

    return { estilos };
};