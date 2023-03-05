import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";
import { GestureResponderEvent, ViewProps,  TouchableOpacity, View } from "react-native";
import NotificacaoToast from "../../interfaces/context/NotificacaoToast";
import Texto from "../Texto";
import { useEstilos, estiloNotificacao } from "./styles";

type ToastProps = NotificacaoToast & ViewProps;

export default function Toast(props: ToastProps) {

    const { estilos } = useEstilos();

    return (
        <View {...props} style={[
            estilos[props.estilo].card,
            props.style,
            props.notificacao ? estiloNotificacao.notificacao : {}
        ]}>
            <View style={estilos[props.estilo].infos}>
                <Feather name={props.icone} style={estilos[props.estilo].icone} />
                <Texto style={estilos[props.estilo].texto}>{props.texto}</Texto>
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
                    <Texto peso="700Bold" style={estilos[props.estilo].botaoTexto}>{props.labelBotao}</Texto>
                </TouchableOpacity>
                :
                null
            }
        </View>
    );
}