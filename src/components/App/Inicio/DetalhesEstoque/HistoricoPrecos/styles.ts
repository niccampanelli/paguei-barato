import { StyleSheet } from "react-native";
import variaveisEstilo from "../../../../../variaveisEstilo";

export default StyleSheet.create({

    main: {
        flex: 1,
        width: "100%",
        height: 400,
        padding: 20,
        paddingTop: 60,
        paddingBottom: 10,
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
    },

    scroll: {
        flex: 1,
        paddingBottom: 10,
    },

    conteudo: {
        flexDirection: "row",
    },

    quantidade: {
        position: "absolute",
        top: 20,
        left: 20
    },

    coluna: {
        width: 70,
        height: "100%",
        display: "flex",
        flex: 1,
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
        marginTop: 10
    },

    tagPreco: {
        flex: 0,
        display: "flex",
        marginBottom: 10
    },

    barra: {
        width: "100%",
        borderTopLeftRadius: variaveisEstilo.layout.raioBorda,
        borderTopRightRadius: variaveisEstilo.layout.raioBorda
    }
});