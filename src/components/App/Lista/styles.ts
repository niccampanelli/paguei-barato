import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export const useEstilos = () => {

    const { propriedadesTema } = useTemaContext();
    const estilos = StyleSheet.create({

        container: {
            flex: 1,
            paddingTop: Constants.statusBarHeight + propriedadesTema.layout.paddingVertical,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal
        },

        resumo: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16
        },

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

        listaItemSwipe: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal + 2,
            backgroundColor: propriedadesTema.cores.destaque,
        },

        listaItem: {
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
            paddingVertical: 4,
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
        },

        listaItemConteudo: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8
        },

        listaItemImagemContainer: {
            backgroundColor: "#ffffff",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
            borderColor: propriedadesTema.cores.fundoSecundario,
            borderWidth: 2,
            borderStyle: "solid",
        },

        listaItemImagem: {
            height: 30,
            width: 30,
            borderRadius: 8,
        },

        listaItemInfos: {
            flex: 1
        },

        listaItemTexto: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaItemMercado: {
            flex: 1,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoClaro
        },

        listaItemPreco: {
            alignSelf: "flex-start",
            textAlign: "right",
            fontSize: propriedadesTema.tamanhoTextos.texto,
            color: propriedadesTema.cores.textoEscuro
        },

        listaFooter: {
            position: "relative",
            paddingVertical: 10
        },

        adicionarFlutuante: {
            position: "absolute",
            backgroundColor: propriedadesTema.cores.secundaria,
            padding: 10,
            borderRadius: propriedadesTema.layout.raioBorda,
            zIndex: 1,
            elevation: 2,
            right: 0,
            top: "-220%"
        },

        adicionarFlutuanteIcone: {
            fontSize: 34,
            color: "#ffffff"
        },

        listaObservacao: {
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            color: propriedadesTema.cores.textoClaro,
            textAlign: "center"
        },
    });

    return { estilos };
};