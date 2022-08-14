import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    cabecalho: {
        marginBottom: 30
    },

    usuario: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
    },

    usuarioIcone: {
        padding: 10,
        marginRight: 10,
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: 100
    },

    usuarioInfo: {

    },

    opcoes: {
        marginBottom: 0
    },

    opcao: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 20
    },

    opcaoIcone: {
        fontSize: 24,
        marginRight: 10,
        color: variaveisEstilo.cores.textoEscuro
    },

    opcaoIconeVermelho: {
        fontSize: 24,
        marginRight: 10,
        color: variaveisEstilo.cores.vermelho
    },

    opcaoTexto: {
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    opcaoTextoVermelho: {
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.vermelho
    }
});