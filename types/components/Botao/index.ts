import { TemaCores } from "@/types/contants/tema";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

type BotaoPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

export interface BotaoProps extends PressableProps {
    /**
     * Texto do botão
     * @default ""
     */
    children: string;
    /**
     * Estilo adicional para o botão
     */
    style?: StyleProp<ViewStyle>;
    variante?: BotaoPropsVariantes;
}