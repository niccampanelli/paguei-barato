import { TemaCores, TemaLayoutPaddings } from "@/types/contants/tema";
import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

type BotaoPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

type BotaoPropsTamanhos = keyof Pick<TemaLayoutPaddings, "botaoGrande" | "botaoPequeno">;

type BotaoPropsIconeNome = keyof typeof Feather.glyphMap;

export interface BotaoProps extends PressableProps {
    /**
     * Texto do botão
     * @default ""
     */
    children: ReactNode;
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
    /**
     * Nome do ícone a ser exibido no botão.
     * @default ""
     */
    iconeNome?: BotaoPropsIconeNome;
    /**
     * Lado do ícone no botão.
     * @default "esquerda"
     */
    iconeLado?: "esquerda" | "direita";
}