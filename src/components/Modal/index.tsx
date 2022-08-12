import { Ref } from "react";
import { LegacyRef, ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../estiloGlobal";

interface ModalProps {
    titulo: string,
    children?: ReactNode,
    possuiBotoes?: boolean,
    labelBotaoPrincipal?: string,
    labelBotaoSecundario?: string,
    aoPressionarBotaoPrincipal?: (evento: GestureResponderEvent) => void,
    aoPressionarBotaoSecundario?: (evento: GestureResponderEvent) => void
    refSheet?: Ref<RBSheet>
}

export default function Modal({
    titulo,
    children = "",
    possuiBotoes = false,
    labelBotaoPrincipal = "Continuar",
    labelBotaoSecundario = "Cancelar",
    aoPressionarBotaoPrincipal,
    aoPressionarBotaoSecundario,
    refSheet
}: ModalProps) {

    return (
        <RBSheet animationType="fade" closeOnDragDown dragFromTopOnly ref={refSheet} customStyles={{ draggableIcon: { backgroundColor: "#000000", height: 10 } }}>
            <View>
                <Text style={estiloGlobal.titulo}>{titulo}</Text>
                <>
                    {children}
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
        </RBSheet>
    );
}