import { TextProps } from "react-native";

export default interface TextoProps extends TextProps {
    peso?: "400Regular" | "500Medium" | "600SemiBold" | "700Bold" | "800ExtraBold" | "900Black";
    italico?: boolean;
}