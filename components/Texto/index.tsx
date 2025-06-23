import { TextoPesoValor, TextoProps } from "@/types/components/Texto";
import { Platform, Text } from "react-native";

export default function Texto({
    children,
    peso = "800"
}: TextoProps) {

    return (
        <Text
            style={{
                fontFamily: Platform.select({
                    android: `Nunito${TextoPesoValor[peso][0]}`,
                    ios: `Nunito${TextoPesoValor[peso][1]}`,
                }),
                fontSize: 16,
                color: '#333',
                lineHeight: 24,
            }}
        >
            {children}
        </Text>
    )
}