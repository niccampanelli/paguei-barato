import { tema } from "@/constants/tema";
import { BotaoProps } from "@/types/components/shared/Botao";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet } from "react-native";
import Texto from "../Texto";

export default function Botao({
    children,
    variante = "destaque",
    tamanho = "botaoGrande",
    iconeNome,
    iconeLado = "direita",
    disabled,
    style,
    ...resto
}: BotaoProps) {

    const Icone = (
        <Feather
            name={iconeNome}
            size={
                tamanho === "botaoGrande"
                    ? tema.texto.tamanhos.texto
                    : tema.texto.tamanhos.legenda
            }
            color={tema.cores[variante].contraste}
        />
    );

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? tema.cores[variante].escuro
                        : tema.cores[variante].normal,
                    paddingVertical: tema.layout.paddings[tamanho].vertical,
                    paddingHorizontal: tema.layout.paddings[tamanho].horizontal,
                    columnGap: tamanho === "botaoGrande"
                        ? tema.layout.espacamentos.medio
                        : tema.layout.espacamentos.pequeno,
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
            {iconeNome && iconeLado === "esquerda" && Icone}
            {children &&
                <Texto
                    variante="subtitulo"
                    style={{
                        color: tema.cores[variante].contraste,
                        fontSize: tamanho === "botaoGrande"
                            ? tema.texto.tamanhos.texto
                            : tema.texto.tamanhos.legenda
                    }}
                >
                    {children}
                </Texto>
            }
            {iconeNome && iconeLado === "direita" && Icone}
        </Pressable>
    );
}

const estilos = StyleSheet.create({
    botao: {
        borderRadius: tema.layout.raioBorda,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});