import { tema } from "@/constants/tema";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Caixa from "../Caixa";
import BarraNavegacaoBotao from "./BarraNavegacaoBotao";

export default function BarraNavegacao({
    state,
    navigation,
    descriptors,
}: BottomTabBarProps) {

    const insets = useSafeAreaInsets();

    return (
        <Caixa
            tamanho="grande"
            style={[
                {
                    paddingBottom: insets.bottom,
                },
                estilos.barra
            ]}
        >
            {
                state.routes.map((route, i) => (
                    <BarraNavegacaoBotao key={i}>
                        Inicio
                    </BarraNavegacaoBotao>
                ))
            }
        </Caixa>
    );
}

const estilos = StyleSheet.create({
    barra: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: tema.layout.paddings.grande.horizontal,
    }
});