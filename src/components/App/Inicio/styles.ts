import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    main: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 0
    },

    container: {
        paddingVertical: variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: 0
    },

    logo: {
        height: 34,
        width: 220,
        marginBottom: 24,
    },

    cabecalho: {
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        marginBottom: 16
    },

    destaque: {
        position: "relative",
        width: "100%",
        height: 150,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        marginBottom: 16
    },

    destaqueImagem: {
        width: "100%",
        height: "100%",
        borderRadius: variaveisEstilo.layout.raioBorda
    },

    destaqueBadge: {
        position: "absolute",
        left: variaveisEstilo.layout.paddingHorizontal + 10,
        top: 10,
        zIndex: 1
    },

    carrossel: {
        marginBottom: 24
    }
});