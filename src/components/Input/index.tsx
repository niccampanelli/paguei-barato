import { ReactElement } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import estiloGlobal from "../../estiloGlobal";

interface InputProps extends TextInputProps{
    icone: ReactElement
}

export default function Input({
    icone,
    ...props
}: InputProps) {

    return (
        <View style={estiloGlobal.input}>
            {icone}
            <TextInput style={estiloGlobal.inputCampo} {...props}/>
        </View>
    );
}