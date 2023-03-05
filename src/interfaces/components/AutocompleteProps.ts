import { TextInputProps } from "react-native";
import { IconeType } from "../IconeType";

export default interface AutocompleteProps extends TextInputProps {
    icone?: IconeType;
    dados: any[];
    alturaLista?: number;
}