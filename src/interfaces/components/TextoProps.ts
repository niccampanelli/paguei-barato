import { TextProps } from "react-native";

export type TextoPesos = "400Regular" | "500Medium" | "600SemiBold" | "700Bold" | "800ExtraBold" | "900Black";

export default interface TextoProps extends TextProps {
    peso?: TextoPesos;
    italico?: boolean;
}