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
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        item: {
            width: 130,
            position: "relative"
        },

        itemBadge: {
            position: "absolute",
            right: 5,
            top: 5,
            zIndex: 1
        },

        itemImagem: {
            width: 130,
            height: 130,
            marginBottom: 10
        },

        itemPreco: {
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
            fontWeight: "800",
            color: propriedadesTema.cores.secundaria
        },

        itemNome: {
            fontSize: propriedadesTema.tamanhoTextos.texto,
            fontWeight: "800",
            color: propriedadesTema.cores.textoEscuro
        },

        itemMercado: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            fontWeight: "400",
            color: propriedadesTema.cores.textoClaro
        }
    });

    return { estilos };
};