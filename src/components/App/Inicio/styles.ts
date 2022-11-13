import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            paddingTop: Constants.statusBarHeight,
            paddingHorizontal: 0
        },

        container: {
            paddingVertical: propriedadesTema.layout.paddingVertical,
            paddingHorizontal: 0
        },

        logo: {
            height: 34,
            width: 220,
            marginBottom: 24,
        },

        cabecalho: {
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            marginBottom: 16
        },

        destaque: {
            position: "relative",
            width: "100%",
            height: 150,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            marginBottom: 16
        },

        destaqueImagem: {
            width: "100%",
            height: "100%",
            borderRadius: propriedadesTema.layout.raioBorda
        },

        destaqueBadge: {
            position: "absolute",
            left: propriedadesTema.layout.paddingHorizontal + 10,
            top: 10,
            zIndex: 1
        },

        carrossel: {
            marginBottom: 24
        }
    });

    return { estilos };
};