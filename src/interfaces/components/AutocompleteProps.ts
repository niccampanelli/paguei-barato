import { TextInputProps } from "react-native";
import { IconeType } from "../IconeType";

export default interface AutocompleteProps<TipoItem> extends Omit<TextInputProps, 'onChangeText' | 'onChange' | 'value'> {
    icone?: IconeType;
    dados: TipoItem[];
    alturaLista?: number;
    aoSelecionar: (item: TipoItem) => void;
    extrairChave: (item: TipoItem) => string;
    forwardRef?: React.MutableRefObject<any>;
}