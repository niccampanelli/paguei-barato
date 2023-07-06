import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        container: {
            flex: 1,
            position: "relative",
            paddingVertical: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
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
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: 100,
            color: "#000000",
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
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
        }
    });

    return { estilos };
};