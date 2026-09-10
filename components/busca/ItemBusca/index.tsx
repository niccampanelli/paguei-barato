import { Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { ItemBuscaProps } from "@/types/components/busca";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ItemBusca({
    titulo,
    subtitulo,
    imagemUrl,
    aoPressionar,
}: ItemBuscaProps) {

    return (
        <TouchableOpacity
            style={estilos.item}
            onPress={aoPressionar}
        >
            <Image
                source={{
                    uri: imagemUrl,
                }}
                contentFit="contain"
                style={estilos.imagem}
            />
            <View style={estilos.conteudo}>
                <Texto
                    variante="link"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={estilos.titulo}
                >
                    {titulo}
                </Texto>
                <Texto variante="legenda">
                    {subtitulo}
                </Texto>
            </View>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    item: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
    },
    conteudo: {
        flex: 1,
        minWidth: 0,
    },
    titulo: {
        flexShrink: 1,
    },
    imagem: {
        width: tema.texto.tamanhos.subtitulo * 2,
        borderRadius: 8,
    },
});