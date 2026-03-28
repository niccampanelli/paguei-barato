import { AlertaProviderProps } from "@/types/components/shared";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Alerta from "../../Alerta";
import Caixa from "../../Caixa";

export default function AlertaProvider({
    children,
}: AlertaProviderProps) {

    const insets = useSafeAreaInsets();

    return (
        <>
            <Caixa
                tamanho="grande"
                style={[{ flex: 1, marginBottom: insets.bottom }, estilos.container]}
            >
                <Alerta />
            </Caixa>
            {children}
        </>
    );
}

const estilos = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column-reverse",
    }
});
