import { StyleSheet } from "react-native";
import { useTemaContext } from "../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();

    const base = StyleSheet.create({

        card: {
            display: "flex",
            flexDirection: "column",
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
            fontSize: propriedadesTema.tamanhoTextos.subtitulo
        },

        texto: {
            flex: 1,
            alignSelf: "center",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            marginLeft: 20
        },

        botaoFechar: {
            padding: 4,
            marginLeft: 20
        },

        fechar: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
        },

        botao: {
            alignSelf: "flex-end",
            paddingLeft: 40,
            paddingTop: 28,
        },

        botaoTexto: {
            fontSize: propriedadesTema.tamanhoTextos.texto
        }
    });

    const destaque = StyleSheet.create({

        card: {
            backgroundColor: propriedadesTema.cores.destaqueClaro,
        },

        icone: {
            color: propriedadesTema.cores.destaqueEscuro,
        },

        texto: {
            color: propriedadesTema.cores.destaqueEscuro,
        },

        fechar: {
            color: propriedadesTema.cores.destaqueEscuro,
        },

        botaoTexto: {
            color: propriedadesTema.cores.destaque,
        }
    });

    const secundario = StyleSheet.create({

        card: {
            backgroundColor: propriedadesTema.cores.secundariaClaro,
        },

        icone: {
            color: propriedadesTema.cores.secundariaEscuro,
        },

        texto: {
            color: propriedadesTema.cores.secundariaEscuro,
        },

        fechar: {
            color: propriedadesTema.cores.secundariaEscuro,
        },

        botaoTexto: {
            color: propriedadesTema.cores.secundariaEscuro,
        }
    });

    const normal = StyleSheet.create({

        card: {
            backgroundColor: propriedadesTema.cores.fundoSecundario,
        },

        icone: {
            color: propriedadesTema.cores.textoEscuro,
        },

        texto: {
            color: propriedadesTema.cores.textoEscuro,
        },

        fechar: {
            color: propriedadesTema.cores.textoEscuro,
        },

        botaoTexto: {
            color: propriedadesTema.cores.textoEscuro,
        }
    });

    const vermelho = StyleSheet.create({

        card: {
            backgroundColor: propriedadesTema.cores.vermelhoClaro,
        },

        icone: {
            color: propriedadesTema.cores.vermelhoEscuro,
        },

        texto: {
            color: propriedadesTema.cores.vermelhoEscuro,
        },

        fechar: {
            color: propriedadesTema.cores.vermelhoEscuro,
        },

        botaoTexto: {
            color: propriedadesTema.cores.vermelhoEscuro,
        }
    });

    return { estilos: { base, destaque, secundario, normal, vermelho } };
};

export const estiloNotificacao = StyleSheet.create({
    notificacao: {
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    }
});