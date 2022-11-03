import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

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
        paddingVertical: variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
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
        paddingTop: variaveisEstilo.layout.paddingVertical + Constants.statusBarHeight,
        paddingBottom: variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    cadastroFim: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    cadastroFimIcone: {
        fontSize: 100,
        color: "#000000",
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: 100,
        padding: 40
    }
});