import { View } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import Texto from "../Texto";

export default function CarregandoOverlay() {

    const { estiloGlobal } = useEstiloGlobal();

    return (
        <View style={estiloGlobal.carregandoOverlay}>
            <Texto peso="700Bold" style={estiloGlobal.carregandoTexto}>Carregando...</Texto>
        </View>
    );
}