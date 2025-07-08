import { tema } from "@/constants/tema";
import { EmblemaProps } from "@/types/components/Emblema";
import { StyleSheet, View } from "react-native";
import Texto from "../Texto";

export default function Emblema({
    variante = "destaque",
    tamanho = "botaoGrande",
    children,
    ...resto
}: EmblemaProps) {

    return (
        <View>
            <View
                style={[
                    {
                        backgroundColor: tema.cores[variante].normal,
                        paddingVertical: tema.layout.paddings[tamanho].vertical,
                        paddingHorizontal: tema.layout.paddings[tamanho].horizontal,
                    },
                    estilos.emblema,
                ]}
                {...resto}
            >
                {children && typeof children === 'string' ?
                    <Texto
                        variante="subtitulo"
                        style={{
                            color: tema.cores[variante].contraste,
                        }}
                    >
                        {children}
                    </Texto>
                    :
                    children
                }
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    emblema: {
        borderRadius: 100,
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
});