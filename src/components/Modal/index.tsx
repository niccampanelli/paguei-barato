import { Ref } from "react";
import { LegacyRef, ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../estiloGlobal";
import variaveisEstilo from "../../variaveisEstilo";

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
        <RBSheet animationType="fade" closeOnDragDown dragFromTopOnly ref={refSheet} height={240} customStyles={{ draggableIcon: estiloGlobal.modalHandle, container: { borderRadius: variaveisEstilo.layout.raioBorda } }}>
            <View style={estiloGlobal.modalCard}>
                <Text style={[estiloGlobal.titulo, estiloGlobal.modalTitulo]}>{titulo}</Text>
                <>
                    {children || null}
                </>
                {possuiBotoes ?
                    <View style={estiloGlobal.modalOpcoes}>
                        <TouchableOpacity style={estiloGlobal.tagPequenaNormal} onPress={aoPressionarBotaoPrincipal}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>{labelBotaoPrincipal}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaDestaque, estiloGlobal.modalOpcaoSecundaria]} onPress={aoPressionarBotaoSecundario}>
                            <Text style={estiloGlobal.tagPequenaDestaqueTexto}>{labelBotaoSecundario}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </View>
        </RBSheet>
    );
}