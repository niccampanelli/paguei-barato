import { StyleSheet } from "react-native";
import variaveisEstilo from "../../variaveisEstilo";

export default StyleSheet.create({
    
    corpo: {
        width: "100%"
    },

    titulo: {
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal,
        marginBottom: 10
    },

    container: {
        paddingHorizontal: variaveisEstilo.layout.paddingHorizontal
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
        fontSize: variaveisEstilo.tamanhoTextos.subtitulo,
        fontWeight: "800",
        color: variaveisEstilo.cores.secundaria
    },

    itemNome: {
        fontSize: variaveisEstilo.tamanhoTextos.texto,
        fontWeight: "800",
        color: variaveisEstilo.cores.textoEscuro
    },

    itemMercado: {
        fontSize: variaveisEstilo.tamanhoTextos.observacao,
        fontWeight: "400",
        color: variaveisEstilo.cores.textoClaro
    }
});