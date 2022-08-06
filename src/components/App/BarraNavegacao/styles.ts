import { StyleSheet } from "react-native";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({
    
    barra: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        paddingVertical: 10,
        height: 68
    },

    botaoNormal: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: variaveisEstilo.cores.fundoPrincipal,
        borderRadius: variaveisEstilo.layout.raioBorda
    },

    botaoNormalTexto: {
        display: "none"
    },

    botaoNormalIcone: {
        fontSize: variaveisEstilo.botoesGrandes.texto
    },

    botaoSelecionado: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: variaveisEstilo.layout.raioBorda
    },

    botaoSelecionadoTexto: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        fontWeight: "800",
        color: variaveisEstilo.cores.textoEscuro
    },

    botaoSelecionadoIcone: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        marginRight: variaveisEstilo.botoesGrandes.espacamento
    }
});