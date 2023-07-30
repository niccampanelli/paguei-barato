import { ReactElement, useState } from "react";
import { TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import { useTemaContext } from "../../util/context/providers/temaProvider";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
    icone: ReactElement,
    forwardRef?: React.MutableRefObject<any>,
}

export default function Input({
    icone,
    forwardRef,
    secureTextEntry,
    ...props
}: InputProps) {

    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema } = useTemaContext();

    const [visibilidadeCampo, setVisibilidadeCampo] = useState<boolean>(secureTextEntry || false);

    return (
        <View style={estiloGlobal.input}>
            {icone}
            <TextInput ref={forwardRef} placeholderTextColor={propriedadesTema.cores.textoClaro} secureTextEntry={visibilidadeCampo} style={estiloGlobal.inputCampo} {...props} />
            {secureTextEntry &&
                <TouchableOpacity style={{ paddingVertical: 5, paddingLeft: 10 }} onPress={() => setVisibilidadeCampo(!visibilidadeCampo)}>
                    {visibilidadeCampo ?
                        <Feather name="eye" size={20} color={propriedadesTema.cores.textoClaro} />
                        :
                        <Feather name="eye-off" size={20} color={propriedadesTema.cores.textoClaro} />
                    }
                </TouchableOpacity>
            }
        </View>
    );
}