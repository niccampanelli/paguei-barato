import { Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { ItemBuscaProps } from "@/types/components/busca";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ItemBusca({
    titulo,
    subtitulo,
    imagemUrl,
}: ItemBuscaProps) {

    return (
        <TouchableOpacity style={estilos.item}>
            <Image
                source={{
                    uri: imagemUrl,
                }}
                contentFit="contain"
                style={estilos.imagem}
            />
            <View>
                <Texto variante="subtitulo">
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
    imagem: {
        width: tema.texto.tamanhos.subtitulo * 2,
        borderRadius: 8,
    },
});