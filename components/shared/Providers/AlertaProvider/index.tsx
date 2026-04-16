import { tema } from "@/constants/tema";
import { AlertaAcoesContextType } from "@/context/alerta/alertaAcoesContext";
import { useAppSelector } from "@/hooks/store";
import { selectAlerta } from "@/store/alerta/alertaSlice";
import { AlertaProviderProps } from "@/types/components/shared";
import { AlertaAcao } from "@/types/context/alerta/alertaAcoesContext";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Alerta from "../../Alerta";
import Caixa from "../../Caixa";

export default function AlertaProvider({
    children,
}: AlertaProviderProps) {

    const alertaAcoesRef = useRef<Map<string, AlertaAcao>>(new Map());

    const insets = useSafeAreaInsets();
    const { alertas } = useAppSelector(selectAlerta);

    function registrarAlertaAcao(id: string, callback: AlertaAcao) {
        alertaAcoesRef.current.set(id, callback);
    }

    function removerAlertaAcao(id: string) {
        alertaAcoesRef.current.delete(id);
    }

    function executarAlertaAcao(id: string) {
        alertaAcoesRef.current.get(id)?.();
    }

    return (
        <AlertaAcoesContextType.Provider value={{ registrarAlertaAcao, removerAlertaAcao, executarAlertaAcao }}>
            <Caixa
                tamanho="grande"
                style={[{ flex: 1, marginBottom: insets.bottom + tema.layout.paddings.grande.vertical }, estilos.container]}
            >
                {alertas.map((alerta) => (
                    <Alerta key={alerta.id} alerta={alerta} />
                ))}
            </Caixa>
            {children}
        </AlertaAcoesContextType.Provider>
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
        pointerEvents: "box-none",
        rowGap: tema.layout.espacamentos.medio,
    }
});
