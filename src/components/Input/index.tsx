import { ReactElement, useState } from "react";
import { TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import { useTemaContext } from "../../util/context/providers/temaProvider";
import { Feather } from "@expo/vector-icons";
import mascarasInput from "../../util/mascarasInput";

type ObjetoTipoMascara = {
    aplicar: (valor: string) => string,
    remover: (valor: string) => string,
}

export type TiposMascara = {
    cep: ObjetoTipoMascara,
    dinheiro: ObjetoTipoMascara,
};

interface InputProps extends Omit<TextInputProps, "onChangeText"> {
    icone: ReactElement,
    mascara?: keyof TiposMascara,
    onChangeText?: ((valor: string, valorSemMascara?: string) => void)
    forwardRef?: React.MutableRefObject<any>,
}

export default function Input({
    icone,
    mascara,
    onChangeText,
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
            <TextInput
                ref={forwardRef}
                placeholderTextColor={propriedadesTema.cores.textoClaro}
                secureTextEntry={visibilidadeCampo}
                style={estiloGlobal.inputCampo}
                onChangeText={(valor) => {
                    if (mascara) {
                        onChangeText?.(
                            mascarasInput[mascara].aplicar(valor),
                            mascarasInput[mascara].remover(valor),
                        );
                    } else {
                        onChangeText?.(valor);
                    }
                }}
                {...props}
            />
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