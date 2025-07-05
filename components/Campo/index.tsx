import { tema } from "@/constants/tema";
import { CampoProps } from "@/types/components/Campo";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from "react-native";
import Texto from "../Texto";

export default function Campo({
    style,
    iconeCor = "secundaria",
    iconeNome,
    iconeLado = "esquerda",
    mostrarLimpar = true,
    ajuda = "",
    erro = "",
    proximo,
    ref,
    returnKeyType,
    placeholderTextColor = tema.cores.texto.claro,
    selectionColor = tema.cores[iconeCor].claro,
    secureTextEntry = false,
    onChangeText,
    onSubmitEditing,
    ...resto
}: CampoProps) {

    const [textoOculto, setTextoOculto] = useState(secureTextEntry || false);

    function aoLimpar() {
        if (onChangeText)
            onChangeText("");
    }
    
    function aoSubmeter(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
        if (proximo && proximo.current) {
            proximo.current.focus();
            return;
        }

        if (onSubmitEditing)
            onSubmitEditing(e)
    }

    const Icone = (
        <Feather
            name={iconeNome}
            size={tema.texto.tamanhos.texto}
            color={erro
                ? tema.cores.vermelho.normal
                : tema.cores[iconeCor].normal
            }
        />
    );

    return (
        <View>
            <View
                style={[
                    estilos.base,
                    style,
                ]}
            >
                {iconeNome && iconeLado === "esquerda" && Icone}
                <TextInput
                    style={estilos.input}
                    placeholderTextColor={placeholderTextColor}
                    selectionColor={selectionColor}
                    secureTextEntry={textoOculto}
                    onChangeText={onChangeText}
                    onSubmitEditing={aoSubmeter}
                    returnKeyType={proximo ? "next" : returnKeyType}
                    ref={ref}
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
            {(erro || ajuda) &&
                <Texto
                    variante="legenda"
                    style={[
                        {
                            color: erro ? tema.cores.vermelho.normal : tema.cores.texto.claro,
                        },
                        estilos.ajuda
                    ]}
                >
                    {erro || ajuda}
                </Texto>
            }
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
    ajuda: {
        marginLeft: tema.layout.paddings.botaoGrande.horizontal
            + tema.texto.tamanhos.texto
            + tema.layout.espacamentos.medio,
        marginTop: tema.layout.espacamentos.pequeno,
    },
});