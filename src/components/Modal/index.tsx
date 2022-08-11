import { ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import estiloGlobal from "../../estiloGlobal";

interface ModalProps {
    titulo: string,
    conteudo?: ReactNode,
    possuiBotoes?: boolean,
    labelBotaoPrincipal?: string,
    labelBotaoSecundario?: string,
    aoPressionarBotaoPrincipal?: (evento: GestureResponderEvent) => void,
    aoPressionarBotaoSecundario?: (evento: GestureResponderEvent) => void
}

export default function Modal({
    titulo,
    conteudo = "",
    possuiBotoes = true,
    labelBotaoPrincipal = "Continuar",
    labelBotaoSecundario = "Cancelar",
    aoPressionarBotaoPrincipal,
    aoPressionarBotaoSecundario
}: ModalProps) {

    return (
        <View>
            <Text style={estiloGlobal.titulo}>{titulo}</Text>
            <>
                {conteudo}
            </>
            {possuiBotoes ?
                <View>
                    <TouchableOpacity onPress={aoPressionarBotaoPrincipal}>
                        <Text>{labelBotaoPrincipal}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={aoPressionarBotaoSecundario}>
                        <Text>{labelBotaoSecundario}</Text>
                    </TouchableOpacity>
                </View>
                :
                null
            }
        </View>
    );
}