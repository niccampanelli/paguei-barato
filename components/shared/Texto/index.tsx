import { tema } from "@/constants/tema";
import { TextoPesoValor, TextoProps } from "@/types/components/shared/Texto";
import { Platform, Text } from "react-native";

export default function Texto({
    peso = "texto",
    cor = "normal",
    tamanho = "texto",
    variante,
    style,
    ...resto
}: TextoProps) {

    const fontSize =
        variante && variante in tema.texto.tamanhos
            ? tema.texto.tamanhos[variante as keyof typeof tema.texto.tamanhos]
            : tema.texto.tamanhos[tamanho as keyof typeof tema.texto.tamanhos];

    const fontWeight =
        variante && variante in tema.texto.pesos
            ? tema.texto.pesos[variante as keyof typeof tema.texto.pesos]
            : tema.texto.pesos[peso as keyof typeof tema.texto.pesos];

    return (
        <Text
            style={[
                {
                    fontFamily: Platform.select({
                        android: `Nunito${TextoPesoValor[fontWeight][0]}`,
                        ios: `Nunito${TextoPesoValor[fontWeight][1]}`,
                    }),
                    fontSize: fontSize,
                    color: tema.cores.texto[cor],
                },
                style
            ]}
            {...resto}
        />
    )
}