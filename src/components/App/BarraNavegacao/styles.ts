import { StyleSheet } from "react-native";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        barra: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            paddingVertical: 10,
            height: 68
        },

        botaoNormal: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        botaoNormalTexto: {
            display: "none"
        },

        botaoNormalIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        botaoSelecionado: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: propriedadesTema.layout.raioBorda
        },

        botaoSelecionadoTexto: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: "#000000"
        },

        botaoSelecionadoIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            marginRight: propriedadesTema.botoesGrandes.espacamento
        }
    });

    return { estilos };
};