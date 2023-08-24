import { StyleSheet } from "react-native";
import { useTemaContext } from "../../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        listaFiltros: {
            paddingVertical: 16,
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },

        listaFiltrosContainer: {
            display: "flex",
            gap: 5,
        },

        filtroContador: {
            marginLeft: propriedadesTema.botoes.espacamento
        },

        listaCabecalho: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
        },

        lista: {
            flex: 1,
            marginHorizontal: -propriedadesTema.layout.paddingHorizontal,
        },

        listaItem: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            borderRadius: 8
        },

        listaItemImagemContainer: {
            position: "relative",
            backgroundColor: "#ffffff",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
        },

        listaItemSelecionadoBadge: {
            display: "flex",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            zIndex: 5,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center"
        },

        listaItemImagem: {
            height: 30,
            width: 30,
            borderRadius: 8,
        },

        listaItemInfos: {
            flex: 1,
        },

        listaItemTexto: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemPreco: {
            alignSelf: "flex-start",
            textAlign: "right",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemMercado: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoClaro
        },

        modalContainer: {
            flex: 1,
            marginBottom: (propriedadesTema.layout.paddingVertical * -1) + 10,
        },

        modalSecao: {
            display: "flex",
            rowGap: 16,
            marginBottom: 10
        },

        modalMapa: {
            width: "100%",
            height: 200,
            borderRadius: propriedadesTema.layout.raioBorda
        },

        modalLista: {
            flex: 1,
            marginTop: 16,
            marginBottom: 10,
            marginHorizontal: propriedadesTema.layout.paddingHorizontal * -1,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },
    });

    return { estilos };
};