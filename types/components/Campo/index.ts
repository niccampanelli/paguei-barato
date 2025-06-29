import { TemaCores } from "@/types/contants/tema";
import Feather from '@expo/vector-icons/Feather';
import { StyleProp, TextInputProps, ViewProps } from "react-native";

type CampoPropsIconeCor = keyof Omit<TemaCores, "fundo" | "texto">;
type CampoPropsIconeNome = keyof typeof Feather.glyphMap;

export interface CampoProps extends TextInputProps {
    /**
     * Estilos adicionais para o campo.
     * @default {}
     */
    style?: StyleProp<ViewProps>;
    /**
     * Cor do ícone do campo.
     * @default "destaque"
     */
    iconeCor?: CampoPropsIconeCor;
    /**
     * Nome do ícone a ser exibido no campo.
     * @default ""
     */
    iconeNome?: CampoPropsIconeNome;
    /**
     * Lado do ícone no campo.
     * @default "esquerda"
     */
    iconeLado?: "esquerda" | "direita";
}