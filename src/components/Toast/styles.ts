import { StyleSheet } from "react-native";
import variaveisEstilo from "../../variaveisEstilo";

const destaque = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: variaveisEstilo.cores.destaqueClaro,
        borderRadius: variaveisEstilo.layout.raioBorda,
        padding: 20
    },

    infos: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    icone: {
        color: variaveisEstilo.cores.destaqueEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo
    },

    texto: {
        flex: 1,
        alignSelf: "center",
        fontWeight: "400",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.destaqueEscuro,
        marginLeft: 20
    },

    fechar: {
        color: variaveisEstilo.cores.destaqueEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        marginLeft: 20
    },

    botao: {
        alignSelf: "flex-end",
        marginTop: 20
    },

    botaoTexto: {
        color: variaveisEstilo.cores.destaque,
        fontSize: variaveisEstilo.tamanhoTextos.texto
    }
});

const secundario = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: variaveisEstilo.cores.secundariaClaro,
        borderRadius: variaveisEstilo.layout.raioBorda,
        padding: 20
    },

    infos: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    icone: {
        color: variaveisEstilo.cores.secundariaEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo
    },

    texto: {
        flex: 1,
        alignSelf: "center",
        fontWeight: "400",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.secundariaEscuro,
        marginLeft: 20
    },

    fechar: {
        color: variaveisEstilo.cores.secundariaEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        marginLeft: 20
    },

    botao: {
        alignSelf: "flex-end",
        marginTop: 20
    },

    botaoTexto: {
        color: variaveisEstilo.cores.secundariaEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto
    }
});

const normal = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        borderRadius: variaveisEstilo.layout.raioBorda,
        padding: 20
    },

    infos: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    icone: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo
    },

    texto: {
        flex: 1,
        alignSelf: "center",
        fontWeight: "400",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro,
        marginLeft: 20
    },

    fechar: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        marginLeft: 20
    },

    botao: {
        alignSelf: "flex-end",
        marginTop: 20
    },

    botaoTexto: {
        color: variaveisEstilo.cores.textoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto
    }
});

const vermelho = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: variaveisEstilo.cores.vermelhoClaro,
        borderRadius: variaveisEstilo.layout.raioBorda,
        padding: 20
    },

    infos: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    icone: {
        color: variaveisEstilo.cores.vermelhoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo
    },

    texto: {
        flex: 1,
        alignSelf: "center",
        fontWeight: "400",
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.vermelhoEscuro,
        marginLeft: 20
    },

    fechar: {
        color: variaveisEstilo.cores.vermelhoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        marginLeft: 20
    },

    botao: {
        alignSelf: "flex-end",
        marginTop: 20
    },

    botaoTexto: {
        color: variaveisEstilo.cores.vermelhoEscuro,
        fontSize: variaveisEstilo.tamanhoTextos.texto
    }
});

const estilos = {
    "destaque": destaque,
    "secundario": secundario,
    "normal": normal,
    "vermelho": vermelho,
}

export default estilos;