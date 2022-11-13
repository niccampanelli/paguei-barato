import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            justifyContent: "flex-end"
        },

        banner: {
            flex: .2,
            width: "100%",
        },

        container: {
            flex: 1,
            paddingVertical: propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        cadastro: {
            flex: 1
        },

        logo: {
            height: 34,
            width: 220,
            marginBottom: 24,
        },

        titulo: {
            marginBottom: 32
        },

        form: {
            marginBottom: 24
        },

        grupoForm: {
            marginBottom: 10
        },

        label: {
            marginBottom: 10
        },

        containerFim: {
            flex: 1,
            paddingTop: propriedadesTema.layout.paddingVertical + Constants.statusBarHeight,
            paddingBottom: propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        cadastroFim: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },

        cadastroFimIcone: {
            fontSize: 100,
            color: "#000000",
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: 100,
            padding: 40
        }
    });

    return { estilos };
};