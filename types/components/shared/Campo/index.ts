import { TemaCores } from "@/types/contants/tema";
import Feather from '@expo/vector-icons/Feather';
import { Ref, RefObject } from "react";
import { StyleProp, TextInput, TextInputProps, ViewProps } from "react-native";

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
    /**
     * Se o campo deve mostrar o ícone de limpar.
     * @default true
     */
    mostrarLimpar?: boolean;
    /**
     * Texto de ajuda exibido abaixo do campo.
     * @default ""
     */
    ajuda?: string;
    /**
     * Texto de erro exibido abaixo do campo.
     * @default ""
     */
    erro?: string;
    /**
     * Próximo campo a ser preenchido. 
     * Quando presente, muda o ``returnKeyType`` para ``next`` e foca o campo ao pressionar.
     * @default undefined
     */
    proximo?: RefObject<TextInput | null>;
    ref?: Ref<TextInput>;
}