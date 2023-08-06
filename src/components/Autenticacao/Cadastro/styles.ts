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
            display: "flex",
            flexDirection: "column",
            paddingVertical: propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        cadastro: {
            flex: 1,
        },

        logo: {
            height: 34,
            width: 220,
            marginBottom: 24,
        },

        titulo: {
            marginBottom: 16
        },

        form: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: 10,
        },

        grupoForm: {
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
        },

        grupoForm2: {
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
        },

        label: {
            marginBottom: 5
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