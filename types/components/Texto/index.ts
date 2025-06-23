export type TextoPesos = "300" | "400" | "700" | "800" | "900";

export const TextoPesoValor: Record<TextoPesos, string[]> = {
    "300": ["_300Light", "-Light"],
    "400": ["_400Regular", "-Regular"],
    "700": ["_700Bold", "-Bold"],
    "800": ["_800ExtraBold", "-ExtraBold"],
    "900": ["_900Black", "-Black"],
}

export interface TextoProps {
    /**
     * Texto a ser exibido
     */
    children: string;
    /**
     * Peso da fonte
     * @default "800"
     */
    peso?: TextoPesos;
}