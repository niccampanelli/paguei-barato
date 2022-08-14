import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    cabecalho: {
    },
    
    barraBusca: {
        display: "flex",
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        borderRadius: variaveisEstilo.layout.raioBorda,
        backgroundColor: variaveisEstilo.cores.fundoSecundario,
        paddingVertical: variaveisEstilo.botoesGrandes.paddingVertical,
        paddingHorizontal: variaveisEstilo.botoesGrandes.paddingHorizontal
    },
    
    barraBuscaCampo: {
        flex: 1,
        fontSize: variaveisEstilo.botoesGrandes.texto,
        marginRight: variaveisEstilo.botoesGrandes.espacamento,
        color: variaveisEstilo.cores.textoEscuro,
        height: "100%",
    },
    
    barraBuscaIcone: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        color: variaveisEstilo.cores.textoClaro
    },
    
    listaFiltros: {
        display: "flex",
        paddingVertical: 16
    },

    filtro: {
        marginRight: 10
    },

    filtroContador: {
        marginLeft: variaveisEstilo.botoes.espacamento
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

    listaItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16
    },

    listaItemImagem: {
        marginRight: 20,
        height: 30,
        width: 30
    },

    listaItemTexto: {
        flex: 1,
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        color: variaveisEstilo.cores.textoEscuro
    },

    modalScrollview: {
        flex: 1,
    },

    modalScrollContent: {
    },

    modalSubtitulo: {
        marginBottom: 10
    },
    
    modalSecao: {
        marginTop: 6,
    },

    modalOpcoes: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flex: 1
    },

    modalOpcao: {
        alignSelf: "flex-start",
        marginBottom: 10,
    }
});