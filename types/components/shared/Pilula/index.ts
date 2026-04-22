import { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface PilulaProps extends PressableProps{
    /**
     * Rótulo da pílula
     */
    titulo: string;
    /**
     * Estado de seleção da pílula
     */
    selecionada?: boolean;
    /**
     * Estilo adicional para a pílula
     */
    style?: StyleProp<ViewStyle>;
}
