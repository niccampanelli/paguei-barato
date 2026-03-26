import { ScrollViewProps } from "react-native";
import { CaixaPropsTamanhos } from "..";

export interface CaixaScrollProps extends ScrollViewProps {
    /**
     * Tamanho do padding interno
     * @default "medio"
     */
    tamanho?: CaixaPropsTamanhos;
}