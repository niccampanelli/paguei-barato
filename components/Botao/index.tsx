import { tema } from "@/constants/tema";
import { BotaoProps } from "@/types/components/Botao";
import { Pressable, StyleSheet } from "react-native";
import Texto from "../Texto";

export default function Botao({
    children,
    variante = "destaque",
    tamanho = "botaoGrande",
    disabled,
    style,
    ...resto
}: BotaoProps) {

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? tema.cores[variante].escuro
                        : tema.cores[variante].normal,
                    paddingVertical: tema.layout.paddings[tamanho].vertical,
                    paddingHorizontal: tema.layout.paddings[tamanho].horizontal,
                    opacity: disabled ? 0.25 : 1,
                },
                estilos.botao,
                style,
            ]}
            android_ripple={{
                color: tema.cores[variante].claro,
            }}
            disabled={disabled}
            {...resto}
        >
            <Texto
                variante="subtitulo"
                style={{
                    color: tema.cores[variante].contraste,
                    fontSize: tamanho === "botaoGrande"
                        ? tema.texto.tamanhos.subtitulo
                        : tema.texto.tamanhos.legenda
                }}
            >
                {children}
            </Texto>
        </Pressable>
    );
}

const estilos = StyleSheet.create({
    botao: {
        borderRadius: tema.layout.raioBorda,
    },
});