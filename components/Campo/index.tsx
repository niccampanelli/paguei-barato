import { tema } from "@/constants/tema";
import { CampoProps } from "@/types/components/Campo";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Campo({
    style,
    iconeCor = "secundaria",
    iconeNome,
    iconeLado = "esquerda",
    mostrarLimpar = true,
    placeholderTextColor = tema.cores.texto.claro,
    selectionColor = tema.cores[iconeCor].claro,
    secureTextEntry = false,
    onChangeText,
    ...resto
}: CampoProps) {

    const [textoOculto, setTextoOculto] = useState(secureTextEntry || false);

    function aoLimpar() {
        if (onChangeText) {
            onChangeText("");
        }
    }

    const Icone = (
        <Feather
            name={iconeNome}
            size={tema.texto.tamanhos.texto}
            color={tema.cores[iconeCor].normal}
        />
    );

    return (
        <View
            style={[
                estilos.base,
                style,
            ]}
        >
            {iconeNome && iconeLado === "esquerda" && Icone}
            <TextInput
                style={[
                    estilos.input
                ]}
                placeholderTextColor={placeholderTextColor}
                selectionColor={selectionColor}
                secureTextEntry={textoOculto}
                onChangeText={onChangeText}
                {...resto}
            />
            {mostrarLimpar &&
                <TouchableOpacity onPress={aoLimpar}>
                    <Feather
                        name="x"
                        size={tema.texto.tamanhos.texto}
                        color={tema.cores.texto.claro}
                    />
                </TouchableOpacity>
            }
            {secureTextEntry &&
                <TouchableOpacity onPress={() => setTextoOculto(!textoOculto)}>
                    <Feather
                        name={textoOculto ? "eye" : "eye-off"}
                        size={tema.texto.tamanhos.texto}
                        color={tema.cores.texto.claro}
                    />
                </TouchableOpacity>
            }
            {iconeNome && iconeLado === "direita" && Icone}
        </View>
    );
}

const estilos = StyleSheet.create({
    base: {
        borderRadius: tema.layout.raioBorda,
        backgroundColor: tema.cores.fundo.secundario,
        paddingHorizontal: tema.layout.paddings.botaoGrande.horizontal,
        flexDirection: "row",
        alignItems: "center",
        columnGap: tema.layout.espacamentos.medio,
    },
    input: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: tema.layout.paddings.botaoGrande.vertical,
        color: tema.cores.texto.escuro,
        fontSize: tema.texto.tamanhos.texto,
    },
});