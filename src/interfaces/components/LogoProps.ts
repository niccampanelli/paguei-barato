import { ImageProps } from 'react-native';
import { TemaType } from '../context/TemaType';

export default interface LogoProps extends Omit<ImageProps, 'source' | 'resizeMode'> {
    tema?: TemaType;
}