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
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            paddingTop: (propriedadesTema.layout.paddingVertical * 2) + 16,
            paddingBottom: propriedadesTema.layout.paddingVertical,
        },

        form: {
            flex: 1,
            paddingTop: 16,
            display: "flex",
            flexDirection: "column",
            rowGap: 10,
        },

        grupoForm: {
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
        },

        imagemProduto: {
            width: "100%",
            height: 200,
            borderRadius: propriedadesTema.layout.raioBorda,
            resizeMode: "cover",
        },

        botaoAdicionarView: {
            paddingVertical: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },
    });

    return { estilos };
};