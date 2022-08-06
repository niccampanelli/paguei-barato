import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import variaveisEstilo from "../../../variaveisEstilo";

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: Constants.statusBarHeight + variaveisEstilo.layout.paddingVertical,
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
    },

    cabecalho: {
        marginBottom: 30
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
        height: "100%",
    },
    
    barraBuscaIcone: {
        fontSize: variaveisEstilo.botoesGrandes.texto,
        color: variaveisEstilo.cores.textoClaro
    },
    
    listaFiltros: {
        display: "flex",
        marginTop: 16
    },

    filtro: {
        marginRight: 10
    },

    listaCabecalho: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16
    }
});