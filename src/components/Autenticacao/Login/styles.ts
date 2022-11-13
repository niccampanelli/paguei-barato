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
            flex: 1,
            width: "100%",
        },

        container: {
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
            marginBottom: 60
        },

        grupoForm: {
            marginBottom: 10
        },

        label: {
            marginBottom: 10
        },

        opcoesLoginCima: {
            flexDirection: "row"
        },

        opcoesLoginPrincipal: {
            flex: 1,
            marginLeft: 16
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