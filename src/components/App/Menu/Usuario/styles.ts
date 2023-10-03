import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
        },

        container: {
            position: "relative",
            paddingVertical: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical + 34,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        voltar: {
            position: "absolute",
            top: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            left: propriedadesTema.layout.paddingHorizontal,
            zIndex: 2
        },

        usuario: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 20
        },

        usuarioIcone: {
            width: 45,
            height: 45,
            textAlign: "center",
            verticalAlign: "middle",
            marginRight: 10,
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: 100,
            color: "#000000",
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
        },

        grupoInput: {
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
            marginBottom: 10
        },

        grupoInput2: {
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
        },

        label: {
            marginBottom: 5
        },

        opcao: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 10,
        },

        opcaoIcone: {
            fontSize: 24,
            marginRight: 10,
            color: propriedadesTema.cores.textoEscuro
        },

        opcaoIconeVermelho: {
            fontSize: 24,
            marginRight: 10,
            color: propriedadesTema.cores.vermelho
        },

        opcaoTexto: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        opcaoTextoVermelho: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.vermelho
        },

        botaoSalvarView: {
            paddingVertical: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        }
    });

    return { estilos };
};