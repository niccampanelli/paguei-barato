import { ReactElement } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";

interface InputProps extends TextInputProps{
    icone: ReactElement,
    forwardRef?: React.MutableRefObject<any>
}

export default function Input({
    icone,
    forwardRef,
    ...props
}: InputProps) {
    
    const { estiloGlobal } = useEstiloGlobal();

    return (
        <View style={estiloGlobal.input}>
            {icone}
            <TextInput ref={forwardRef} style={estiloGlobal.inputCampo} {...props}/>
        </View>
    );
}