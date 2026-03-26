import { TemaCores, TemaTextoPesos, TemaTextoTamanhos } from "@/types/contants/tema";
import { TextProps } from "react-native";

export const TextoPesoValor: Record<number, string[]> = {
    300: ["_300Light", "-Light"],
    400: ["_400Regular", "-Regular"],
    700: ["_700Bold", "-Bold"],
    800: ["_800ExtraBold", "-ExtraBold"],
    900: ["_900Black", "-Black"],
}

export type TextoPropsPesos = keyof TemaTextoPesos;

export type TextoPropsTamanhos = keyof TemaTextoTamanhos;

export type TextoPropsVariantes = TextoPropsPesos | TextoPropsTamanhos;

export interface TextoProps extends TextProps {
    /**
     * Tipo de peso da fonte vindo do tema
     * @default "texto"
     */
    peso?: TextoPropsPesos;
    /**
     * Tipo da cor do texto vindo das cores de texto do tema
     * @default "claro"
     */
    cor?: keyof TemaCores["texto"];
    /**
     * Tipo do tamanho do texto vindo do tema
     * @default "texto"
     */
    tamanho?: TextoPropsTamanhos;
    /**
     * Variante que combina tamanhos e pesos
     * @default undefined
     */
    variante?: TextoPropsVariantes;
}