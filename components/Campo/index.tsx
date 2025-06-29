import { tema } from "@/constants/tema";
import { CampoProps } from "@/types/components/Campo";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TextInput, View } from "react-native";

export default function Campo({
    style,
    iconeCor = "secundaria",
    iconeNome,
    iconeLado = "esquerda",
    placeholderTextColor = tema.cores.texto.claro,
    selectionColor = tema.cores[iconeCor].claro,
    ...resto
}: CampoProps) {

    const Icone = (
        <Feather
            name={iconeNome}
            size={tema.texto.tamanhos.texto}
            color={tema.cores[iconeCor].normal}
            style={{
                fontWeight: 900
            }}
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
                {...resto}
            />
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