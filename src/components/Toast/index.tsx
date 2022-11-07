import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";
import { GestureResponderEvent, ViewProps, Text, TouchableOpacity, View } from "react-native";
import NotificacaoToast from "../../interfaces/NotificacaoToast";
import estilos, { estiloNotificacao } from "./styles";

type ToastProps = NotificacaoToast & ViewProps;

export default function Toast(props: ToastProps) {

    return (
        <View {...props} style={[
            estilos[props.estilo].card,
            props.style,
            props.notificacao ? estiloNotificacao.notificacao : {}
        ]}>
            <View style={estilos[props.estilo].infos}>
                <Feather name={props.icone} style={estilos[props.estilo].icone} />
                <Text style={estilos[props.estilo].texto}>{props.texto}</Text>
                {props.dispensavel ?
                    <TouchableOpacity onPress={props.aoDispensar}>
                        <Feather name="x" style={estilos[props.estilo].fechar} />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            {props.possuiBotao ?
                <TouchableOpacity style={estilos[props.estilo].botao} onPress={props.aoPressionarBotao}>
                    <Text style={estilos[props.estilo].botaoTexto}>{props.labelBotao}</Text>
                </TouchableOpacity>
                :
                null
            }
        </View>
    );
}