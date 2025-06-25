import { TemaLayoutPaddings } from "@/types/contants/tema";
import { ViewProps } from "react-native";

export type CaixaPropsTamanhos = keyof TemaLayoutPaddings;

export interface CaixaProps extends ViewProps {
    /**
     * Tamanho do padding interno
     * @default "medio"
     */
    tamanho?: CaixaPropsTamanhos;
}