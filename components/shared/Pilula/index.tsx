import { tema } from "@/constants/tema";
import { PilulaProps } from "@/types/components/shared";
import { Pressable, StyleSheet } from "react-native";
import Texto from "../Texto";

export default function Pilula({
    titulo,
    selecionada = false,
    onPress,
    disabled = false,
    style,
    ...resto
}: PilulaProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                {
                    backgroundColor: selecionada
                        ? tema.cores.secundaria.normal
                        : tema.cores.info.normal,
                    opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
                },
                estilos.pilula,
                style,
            ]}
            {...resto}
        >
            <Texto
                variante="link"
                cor={selecionada ? "contraste" : "normal"}
            >
                {titulo}
            </Texto>
        </Pressable>
    );
}

const estilos = StyleSheet.create({
    pilula: {
        borderRadius: 999,
        paddingVertical: tema.layout.paddings.botaoPequeno.vertical,
        paddingHorizontal: tema.layout.paddings.botaoPequeno.horizontal,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
    },
});
