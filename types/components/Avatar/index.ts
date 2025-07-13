import { TemaCores, TemaLayoutPaddings } from "@/types/contants/tema";
import { ViewProps } from "react-native";

type AvatarPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

type AvatarPropsTamanhos = keyof Pick<TemaLayoutPaddings, "botaoGrande" | "botaoPequeno">;

export interface AvatarProps extends ViewProps {
    /**
     * Variante de cor do emblema
     * @default "destaque"
     */
    variante?: AvatarPropsVariantes;
    /**
     * Tamanho do emblema
     * @default "botaoGrande"
     */
    tamanho?: AvatarPropsTamanhos;
}