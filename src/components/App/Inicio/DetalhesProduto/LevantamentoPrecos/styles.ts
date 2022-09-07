import { StyleSheet } from "react-native";
import variaveisEstilo from "../../../../../variaveisEstilo";

export default StyleSheet.create({

    main: {
        flex: 1,
        width: "100%",
        height: 400,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 60,
        padding: 20,
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
    },

    quantidade: {
        position: "absolute",
        top: 20,
        left: 20
    },

    coluna: {
        height: "100%",
        display: "flex",
        flexGrow: 0,
        flexShrink: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end"
    },

    label: {
        flex: 0,
        display: "flex",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        fontWeight: "400",
        color: variaveisEstilo.cores.textoEscuro,
        marginBottom: 10
    },

    tagPreco: {
        flex: 0,
        display: "flex",
        marginBottom: 10
    },

    barra: {
        flex: 1,
        width: "100%",
        borderTopLeftRadius: variaveisEstilo.layout.raioBorda,
        borderTopRightRadius: variaveisEstilo.layout.raioBorda
    }
});