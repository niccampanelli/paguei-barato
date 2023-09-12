import { ReactElement, useState, useEffect } from "react";
import { TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import { useTemaContext } from "../../util/context/providers/temaProvider";
import { Feather } from "@expo/vector-icons";
import mascarasInput from "../../util/mascarasInput";
import Texto from "../Texto";

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
    desativado?: boolean,
    erro?: string,
    onChangeText?: ((valor: string, valorSemMascara?: string) => void)
    forwardRef?: React.MutableRefObject<any>,
}

export default function Input({
    icone,
    mascara,
    desativado,
    erro,
    onChangeText,
    forwardRef,
    secureTextEntry,
    ...props
}: InputProps) {

    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema } = useTemaContext();

    const [visibilidadeCampo, setVisibilidadeCampo] = useState<boolean>(secureTextEntry || false);

    return (
        <>
            <View style={estiloGlobal.input}>
                {!!erro &&
                    <View style={estiloGlobal.inputOverlayErro} />
                }
                <View style={desativado && { opacity: 0.3 }}>
                    {icone}
                </View>
                <TextInput
                    ref={forwardRef}
                    placeholderTextColor={propriedadesTema.cores.textoClaro}
                    secureTextEntry={visibilidadeCampo}
                    style={[estiloGlobal.inputCampo, desativado && { opacity: 0.3 }]}
                    editable={!desativado}
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
                    <TouchableOpacity style={[{ paddingVertical: 5, paddingLeft: 10 }, desativado && [{ opacity: 0.3 }]]} onPress={() => setVisibilidadeCampo(!visibilidadeCampo)}>
                        {visibilidadeCampo ?
                            <Feather name="eye" size={20} color={propriedadesTema.cores.textoClaro} />
                            :
                            <Feather name="eye-off" size={20} color={propriedadesTema.cores.textoClaro} />
                        }
                    </TouchableOpacity>
                }
            </View>
            {!!erro &&
                <Texto style={[estiloGlobal.inputMensagemErro, desativado && { opacity: 0.3 }]}>
                    {erro}
                </Texto>
            }
        </>
    );
}