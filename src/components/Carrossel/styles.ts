import { StyleSheet } from "react-native";
import { useTemaContext } from "../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        corpo: {
            width: "100%"
        },

        titulo: {
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            marginBottom: 10
        },

        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
            paddingVertical: 10
        },

        item: {
            width: 160,
            padding: 10,
            position: "relative",
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: propriedadesTema.layout.raioBorda,
        },

        itemBadge: {
            position: "absolute",
            right: 15,
            top: 15,
            zIndex: 1
        },

        itemImagem: {
            width: "100%",
            height: 140,
            marginBottom: 20,
            borderRadius: 5,
        },

        itemPreco: {
            marginTop: "auto",
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
            color: propriedadesTema.cores.secundaria
        },

        itemNome: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        itemMercado: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            color: propriedadesTema.cores.textoClaro,
            marginBottom: 10,
        },

        itemPrecoAnterior: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            color: propriedadesTema.cores.textoEscuro,
        }
    });

    return { estilos };
};