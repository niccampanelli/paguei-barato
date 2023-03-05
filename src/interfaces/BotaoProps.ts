import { TouchableOpacityProps } from 'react-native';
import { IconeType } from './IconeType';
import { TextoPesos } from './TextoProps';

export default interface BotaoProps extends TouchableOpacityProps {
    titulo: string;
    icone?: IconeType;
    tipo?: 'principal' | 'secundario';
    tamanho?: 'normal' | 'grande';
    tituloPeso?: TextoPesos;
    tituloItalico?: boolean;
    subtitulo?: string;
    subtituloPeso?: TextoPesos;
    subtituloItalico?: boolean;
}