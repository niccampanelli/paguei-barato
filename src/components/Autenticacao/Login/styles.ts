import { StyleSheet } from "react-native";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    main: {
        flex: 1,
        justifyContent: "flex-end"
    },

    banner: {
        flex: 1,
        width: "100%",
    },

    container: {
        paddingVertical: variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
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
        marginBottom: 60
    },

    grupoForm: {
        marginBottom: 10
    },

    label: {
        marginBottom: 10
    },

    opcoesLoginCima: {
        flexDirection: "row"
    },

    opcoesLoginPrincipal: {
        flex: 1,
        marginLeft: 16
    },

    opcoesLoginLabel: {
        width: "100%",
        marginVertical: 16,
        color: variaveisEstilo.cores.textoClaro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        textAlign: "center"
    }
});