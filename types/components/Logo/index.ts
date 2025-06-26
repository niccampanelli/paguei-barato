import { ImageProps } from "react-native";

export interface LogoProps extends ImageProps {
    /**
     * Largura da logo
     * @default 200
     */
    largura?: number;
}