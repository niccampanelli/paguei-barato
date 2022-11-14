import { ReactElement } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import { useTemaContext } from "../../util/context/providers/temaProvider";

interface InputProps extends TextInputProps {
    icone: ReactElement,
    forwardRef?: React.MutableRefObject<any>
}

export default function Input({
    icone,
    forwardRef,
    ...props
}: InputProps) {

    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema } = useTemaContext();

    return (
        <View style={estiloGlobal.input}>
            {icone}
            <TextInput ref={forwardRef} placeholderTextColor={propriedadesTema.cores.textoClaro} style={estiloGlobal.inputCampo} {...props} />
        </View>
    );
}