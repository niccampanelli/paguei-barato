import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            paddingTop: Constants.statusBarHeight + 2,
            paddingHorizontal: 0,
            position: "relative"
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
        },

        adicionarFlutuante: {
            position: "absolute",
            backgroundColor: propriedadesTema.cores.secundaria,
            padding: 10,
            borderRadius: propriedadesTema.layout.raioBorda,
            zIndex: 1,
            elevation: 2,
            right: propriedadesTema.layout.paddingHorizontal,
            bottom: 10,
        },

        adicionarFlutuanteIcone: {
            fontSize: 34,
            color: "#ffffff"
        },

        modalAdicionarBotoes: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 10
        }
    });

    return { estilos };
};