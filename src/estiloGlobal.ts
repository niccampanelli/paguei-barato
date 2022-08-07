import { StyleSheet } from "react-native";
import variaveisEstilo from "./variaveisEstilo";

export default StyleSheet.create({

    titulo: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.titulo,
        fontWeight: "bold",
    },
    
    subtitulo: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo,
        fontWeight: "bold",
    },

    label: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        fontWeight: "700",
    },

    observacao: {
        color: variaveisEstilo.cores.textoClaro,
        fontSize: variaveisEstilo.tamanhoTextos.observacao,
        fontWeight: "400"
    },

    input: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: variaveisEstilo.layout.raioBorda,
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        paddingVertical: variaveisEstilo.botoesGrandes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoesGrandes.paddingHorizontal
    },

    inputIcone: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        color: variaveisEstilo.cores.secundaria
    },

    inputCampo: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        marginLeft: variaveisEstilo.botoesGrandes.espacamento,
        height: "100%",
        width: "100%"
    },

    botaoPrincipal: {
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoes.paddingHorizontal
    },

    botaoPrincipalTexto: {
        fontSize: variaveisEstilo.botoes.texto,
        fontWeight: "700",
        color: "#000000"
    },

    botaoSecundario: {
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoes.paddingHorizontal
    },

    botaoSecundarioTexto: {
        fontSize: variaveisEstilo.botoes.texto,
        fontWeight: "700",
        color: variaveisEstilo.cores.textoEscuro
    },

    botaoPrincipalGrande: {
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoesGrandes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoesGrandes.paddingHorizontal
    },

    botaoPrincipalGrandeTexto: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        fontWeight: "700",
        color: "#000000"
    },

    botaoSecundarioGrande: {
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoesGrandes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoesGrandes.paddingHorizontal
    },

    botaoSecundarioGrandeTexto: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        fontWeight: "700",
        color: variaveisEstilo.cores.textoEscuro
    },

    tagPequenaNormal: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoes.paddingHorizontal
    },

    tagPequenaNormalTexto: {
        fontSize: variaveisEstilo.botoes.texto,
        fontWeight: "400",
        color: variaveisEstilo.cores.textoEscuro
    },

    tagPequenaDestaque: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: variaveisEstilo.cores.destaque,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoes.paddingHorizontal
    },

    tagPequenaDestaqueTexto: {
        fontSize: variaveisEstilo.botoes.texto,
        fontWeight: "400",
        color: "#000000"
    },

    tagPequenaSecundaria: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: variaveisEstilo.cores.secundaria,
        borderRadius: variaveisEstilo.layout.raioBorda,
        paddingVertical: variaveisEstilo.botoes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoes.paddingHorizontal
    },

    tagPequenaSecundariaTexto: {
        fontSize: variaveisEstilo.botoes.texto,
        fontWeight: "400",
        color: "#ffffff"
    },
});