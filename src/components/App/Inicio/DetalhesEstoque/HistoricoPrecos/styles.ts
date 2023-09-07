import { StyleSheet } from "react-native";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            width: "100%",
            height: 400,
            padding: 20,
            paddingTop: 60,
            paddingBottom: 10,
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        scroll: {
            flex: 1,
            paddingBottom: 10,
        },

        conteudo: {
            flexDirection: "row",
            gap: 16,
        },

        quantidade: {
            position: "absolute",
            top: 20,
            left: 20
        },

        coluna: {
            width: 100,
            height: "100%",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end"
        },

        label: {
            flex: 0,
            display: "flex",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro,
            marginTop: 10
        },

        tagPreco: {
            flex: 0,
            display: "flex",
            marginBottom: 10
        },

        barra: {
            width: "100%",
            borderTopLeftRadius: propriedadesTema.layout.raioBorda,
            borderTopRightRadius: propriedadesTema.layout.raioBorda
        }
    });

    return { estilos };
};