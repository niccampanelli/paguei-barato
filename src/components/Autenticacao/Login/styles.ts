import { StyleSheet } from "react-native";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            justifyContent: "flex-end"
        },

        banner: {
            flex: 0.5,
            width: "100%",
        },

        container: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingVertical: propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        logo: {
            height: 34,
            width: 220,
            marginBottom: 24,
        },

        titulo: {
            marginBottom: 32
        },

        form: {
            flex: 1,
            gap: 16
        },

        label: {
            marginBottom: 5
        },

        viewBotaoLogin: {
            flexDirection: "row",
            gap: 16,
        },

        opcoesLoginLabel: {
            width: "100%",
            marginVertical: 16,
            color: propriedadesTema.cores.textoClaro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            textAlign: "center"
        }
    });

    return { estilos };
};