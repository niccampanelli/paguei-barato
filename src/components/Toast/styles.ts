import { StyleSheet } from "react-native";
import { useTemaContext } from "../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const destaque = StyleSheet.create({

        card: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: propriedadesTema.cores.destaqueClaro,
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 20
        },

        infos: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
        },

        icone: {
            color: propriedadesTema.cores.destaqueEscuro,
            fontSize: propriedadesTema.tamanhoTextos.subtitulo
        },

        texto: {
            flex: 1,
            alignSelf: "center",
            fontWeight: "400",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.destaqueEscuro,
            marginLeft: 20
        },

        fechar: {
            color: propriedadesTema.cores.destaqueEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            marginLeft: 20
        },

        botao: {
            alignSelf: "flex-end",
            marginTop: 20
        },

        botaoTexto: {
            color: propriedadesTema.cores.destaque,
            fontSize: propriedadesTema.tamanhoTextos.texto
        }
    });

    const secundario = StyleSheet.create({

        card: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: propriedadesTema.cores.secundariaClaro,
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 20
        },

        infos: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
        },

        icone: {
            color: propriedadesTema.cores.secundariaEscuro,
            fontSize: propriedadesTema.tamanhoTextos.subtitulo
        },

        texto: {
            flex: 1,
            alignSelf: "center",
            fontWeight: "400",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.secundariaEscuro,
            marginLeft: 20
        },

        fechar: {
            color: propriedadesTema.cores.secundariaEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            marginLeft: 20
        },

        botao: {
            alignSelf: "flex-end",
            marginTop: 20
        },

        botaoTexto: {
            color: propriedadesTema.cores.secundariaEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto
        }
    });

    const normal = StyleSheet.create({

        card: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 20
        },

        infos: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
        },

        icone: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.subtitulo
        },

        texto: {
            flex: 1,
            alignSelf: "center",
            fontWeight: "400",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro,
            marginLeft: 20
        },

        fechar: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            marginLeft: 20
        },

        botao: {
            alignSelf: "flex-end",
            marginTop: 20
        },

        botaoTexto: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto
        }
    });

    const vermelho = StyleSheet.create({

        card: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: propriedadesTema.cores.vermelhoClaro,
            borderRadius: propriedadesTema.layout.raioBorda,
            padding: 20
        },

        infos: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
        },

        icone: {
            color: propriedadesTema.cores.vermelhoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.subtitulo
        },

        texto: {
            flex: 1,
            alignSelf: "center",
            fontWeight: "400",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.vermelhoEscuro,
            marginLeft: 20
        },

        fechar: {
            color: propriedadesTema.cores.vermelhoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            marginLeft: 20
        },

        botao: {
            alignSelf: "flex-end",
            marginTop: 20
        },

        botaoTexto: {
            color: propriedadesTema.cores.vermelhoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto
        }
    });

    return { estilos: { destaque, secundario, normal, vermelho } };
};

export const estiloNotificacao = StyleSheet.create({
    notificacao: {
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    }
});