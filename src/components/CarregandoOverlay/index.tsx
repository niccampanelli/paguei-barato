import { View } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import LogoAnim from './PagueiBaratoIcone';

export default function CarregandoOverlay() {

    const { estiloGlobal } = useEstiloGlobal();

    return (
        <View style={estiloGlobal.carregandoOverlay}>
            <View style={estiloGlobal.carregandoOverlayFundo} />
            <LogoAnim />
        </View>
    );
}