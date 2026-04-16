import { Texto } from "@/components/shared";
import { ItemBuscaProps } from "@/types/components/busca";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ItemBusca({
    titulo,
    subtitulo,
}: ItemBuscaProps) {

    return (
        <TouchableOpacity style={estilos.item}>
            <Texto variante="subtitulo">
                {titulo}
            </Texto>
            <Texto variante="legenda">
                {subtitulo}
            </Texto>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    item: {

    }
});