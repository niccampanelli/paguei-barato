import { tema } from "@/constants/tema";
import { BarraEtapasProps } from "@/types/components/BarraEtapas";
import { StyleSheet, View } from "react-native";

export default function BarraEtapas({
    totalEtapas = 2,
    etapaAtual = 0,
    variantes = "destaque",
    style,
    ...resto
}: BarraEtapasProps) {
    const etapas = Array.from({ length: totalEtapas }, (_, i) => i);

    return (
        <View
            style={[estilos.barra, style]}
            {...resto}
        >
            {etapas.map((etapa) => (
                <View
                    key={etapa}
                    style={[
                        estilos.etapa,
                        {
                            backgroundColor:
                                etapa <= etapaAtual
                                    ? tema.cores[variantes].normal
                                    : tema.cores.fundo.terciario,
                        },
                    ]}
                />
            ))}
        </View>
    );
}

const estilos = StyleSheet.create({
    barra: {
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: tema.layout.espacamentos.pequeno,
    },
    etapa: {
        flex: 1,
        height: 6,
        borderRadius: tema.layout.raioBorda,
    },
});