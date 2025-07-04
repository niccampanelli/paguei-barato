import { tema } from "@/constants/tema";
import { CaixaProps } from "@/types/components/Caixa";
import { View } from "react-native";

export default function Caixa({
    tamanho = "medio",
    style,
    ...resto
}: CaixaProps) {

    return (
        <View
            style={[
                {
                    padding: tema.layout.paddings[tamanho].horizontal,
                    paddingTop: tema.layout.paddings[tamanho].vertical,
                },
                style
            ]}
            {...resto}
        />
    );
}