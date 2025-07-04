import { TemaCores, TemaLayoutPaddings } from "@/types/contants/tema";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

type BotaoPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

type BotaoPropsTamanhos = keyof Pick<TemaLayoutPaddings, "botaoGrande" | "botaoPequeno">;

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
    /**
     * Variante de cor do botão
     * @default "destaque"
     */
    variante?: BotaoPropsVariantes;
    /**
     * Tamanho do botão
     * @default "botaoGrande"
     */
    tamanho?: BotaoPropsTamanhos;
}