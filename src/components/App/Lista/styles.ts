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
            paddingHorizontal: propriedadesTema.layout.paddingHorizontal,
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

        listaItemImagem: {
            marginRight: 20,
            height: 30,
            width: 30
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

        modalContainer: {
            flex: 1,
            marginBottom: (propriedadesTema.layout.paddingVertical * -1) + 10,
        },

        modalSecao: {
            display: "flex",
            marginBottom: 10
        },

        modalBusca: {
            flex: 1,
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
            marginBottom: 10,
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