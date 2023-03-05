import { GestureResponderEvent } from "react-native";
import { IconeType } from "../IconeType";

export default interface NotificacaoToast {
    texto: string,
    icone?: IconeType,
    dispensavel?: boolean,
    notificacao?: boolean,
    possuiBotao?: boolean,
    labelBotao?: string,
    aoPressionarBotao?: (evento: GestureResponderEvent) => void,
    aoDispensar?: (evento: GestureResponderEvent) => void,
    estilo: "destaque" | "secundario" | "normal" | "vermelho"
}