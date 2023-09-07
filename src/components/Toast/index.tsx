import { Feather } from "@expo/vector-icons";
import { ViewProps, TouchableOpacity, View } from "react-native";
import NotificacaoToast from "../../interfaces/context/NotificacaoToast";
import Texto from "../Texto";
import { useEstilos, estiloNotificacao } from "./styles";

type ToastProps = NotificacaoToast & ViewProps;

export default function Toast(props: ToastProps) {

    const { estilos } = useEstilos();

    return (
        <View
            {...props}
            style={[
                estilos.base.card,
                estilos[props.estilo].card,
                props.style,
                props.notificacao ? estiloNotificacao.notificacao : {}
            ]}>
            <View style={estilos.base.infos}>
                <Feather
                    name={props.icone}
                    style={[
                        estilos.base.icone,
                        estilos[props.estilo].icone
                    ]}
                />
                <Texto style={[
                    estilos.base.texto,
                    estilos[props.estilo].texto
                ]}>
                    {props.texto}
                </Texto>
                {props.dispensavel ?
                    <TouchableOpacity
                        onPress={props.aoDispensar}
                        style={estilos.base.botaoFechar}
                    >
                        <Feather
                            name="x"
                            style={[
                                estilos.base.fechar,
                                estilos[props.estilo].fechar
                            ]}
                        />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            {props.possuiBotao ?
                <TouchableOpacity
                    style={estilos.base.botao}
                    onPress={props.aoPressionarBotao}
                >
                    <Texto
                        peso="700Bold"
                        style={[
                            estilos.base.botaoTexto,
                            estilos[props.estilo].botaoTexto
                        ]}
                    >
                        {props.labelBotao}
                    </Texto>
                </TouchableOpacity>
                :
                null
            }
        </View>
    );
}