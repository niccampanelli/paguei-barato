import { StyleSheet } from "react-native";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            width: "100%",
            height: 400,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 60,
            padding: 20,
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        quantidade: {
            position: "absolute",
            top: 20,
            left: 20
        },

        container: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            gap: 10,
        },

        coluna: {
            height: "100%",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end"
        },

        label: {
            flex: 0,
            display: "flex",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro,
            marginBottom: 10
        },

        tagPreco: {
            flex: 0,
            display: "flex",
            marginBottom: 10
        },

        barra: {
            flex: 1,
            width: "100%",
            borderTopLeftRadius: propriedadesTema.layout.raioBorda,
            borderTopRightRadius: propriedadesTema.layout.raioBorda
        }
    });

    return { estilos };
};