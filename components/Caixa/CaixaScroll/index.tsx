import { tema } from "@/constants/tema";
import { CaixaScrollProps } from "@/types/components/Caixa/CaixaScroll";
import { ScrollView } from "react-native";

export default function CaixaScroll({
    tamanho = "medio",
    contentContainerStyle,
    ...resto
}: CaixaScrollProps) {

    return (
        <ScrollView
            contentContainerStyle={[
                {
                    paddingHorizontal: tema.layout.paddings[tamanho].horizontal,
                    paddingVertical: tema.layout.paddings[tamanho].vertical,
                },
                contentContainerStyle,
            ]}
            {...resto}
        />
    );
}