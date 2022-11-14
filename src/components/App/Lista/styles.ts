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

        cabecalho: {
        },

        resumo: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16
        },

        listaFiltros: {
            display: "flex",
            paddingVertical: 16
        },

        filtro: {
            marginRight: 10
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
            flex: 1
        },

        listaItemSwipe: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
            paddingRight: 16,
        },

        listaItem: {
            backgroundColor: propriedadesTema.cores.fundoPrincipal,
        },

        listaItemConteudo: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8
        },

        listaItemImagem: {
            marginRight: 20,
            height: 30,
            width: 30
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
            right: 10,
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

        modalScrollview: {
            flex: 1,
        },

        modalScrollContent: {
        },

        modalSecao: {
            marginBottom: 16
        },

        modalBusca: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            borderRadius: propriedadesTema.layout.raioBorda,
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            paddingVertical: propriedadesTema.botoesGrandes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoesGrandes.paddingHorizontal
        },

        modalBuscaCampo: {
            flex: 1,
            fontSize: propriedadesTema.botoesGrandes.texto,
            marginRight: propriedadesTema.botoesGrandes.espacamento,
            color: propriedadesTema.cores.textoEscuro,
            height: "100%",
        },

        modalBuscaIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: propriedadesTema.cores.textoClaro
        },

        modalMapa: {
            marginTop: 10,
            width: "100%",
            height: 200,
            borderRadius: propriedadesTema.layout.raioBorda
        },

        modalLista: {
            flex: 1,
            maxHeight: 300,
        },

        modalBotaoAdicionar: {
            paddingVertical: 10,
        },

        modalBotaoAdicionarPreco: {
            flexDirection: "row",
            alignItems: "center",
        },

        modalBotaoAdicionarPrecoTexto: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: "#000000",
            marginRight: 16
        }
    });

    return { estilos };
};