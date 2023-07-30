import { View, TouchableOpacity } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import InputImagemProps from "../../interfaces/components/InputImagemProps";
import { Feather } from "@expo/vector-icons";
import Texto from "../Texto";

export default function InputImagem({
    icone,
    placeholder,
    width,
    height,
}: InputImagemProps) {

    const { estiloGlobal } = useEstiloGlobal();

    return (
        <TouchableOpacity style={[estiloGlobal.inputImagem, { width, height }]}>
            <View style={estiloGlobal.inputImagemGrupo}>
                <Feather name={icone} style={estiloGlobal.inputIcone} />
                <Texto style={estiloGlobal.inputImagemTexto}>
                    {placeholder}
                </Texto>
            </View>
        </TouchableOpacity>
    );
}