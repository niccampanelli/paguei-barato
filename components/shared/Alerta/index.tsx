import { AlertaProps } from "@/types/components/shared";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, View } from "react-native";
import Texto from "../Texto";

export default function Alerta({
    alerta,
}: AlertaProps) {

    return (
        <View style={estilos.alerta}>
            <Feather name={alerta.iconeNome} size={24} color="white" />
            <Texto>{alerta.mensagem}</Texto>
        </View>
    )
}

const estilos = StyleSheet.create({
    alerta: {
        backgroundColor: "red",
    }
});
