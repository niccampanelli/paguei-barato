import { StyleSheet, View } from "react-native";
import Texto from "../Texto";

export default function Alerta() {

    return (
        <View style={estilos.alerta}>
            <Texto>Alerta</Texto>
        </View>
    )
}

const estilos = StyleSheet.create({
    alerta: {
        backgroundColor: "red",
    }
});
