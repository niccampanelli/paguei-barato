import { TemaCores, TemaLayoutPaddings } from "@/types/contants/tema";
import { ViewProps } from "react-native";

type EmblemaPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

type EmblemaPropsTamanhos = keyof Pick<TemaLayoutPaddings, "botaoGrande" | "botaoPequeno">;

export interface EmblemaProps extends ViewProps {
    /**
     * Variante de cor do emblema
     * @default "destaque"
     */
    variante?: EmblemaPropsVariantes;
    /**
     * Tamanho do emblema
     * @default "botaoGrande"
     */
    tamanho?: EmblemaPropsTamanhos;
}