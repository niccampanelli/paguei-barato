import { tema } from "@/constants/tema";
import { AlertaAcoesContext } from "@/context/alerta/alertaAcoesContext";
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

    function registrar(id: string, callback: AlertaAcao) {
        alertaAcoesRef.current.set(id, callback);
    }

    function remover(id: string) {
        alertaAcoesRef.current.delete(id);
    }

    function executar(id: string) {
        alertaAcoesRef.current.get(id)?.();
    }

    return (
        <AlertaAcoesContext.Provider value={{ registrar, remover, executar }}>
            <Caixa
                tamanho="grande"
                style={[{ flex: 1, marginBottom: insets.bottom + tema.layout.paddings.grande.vertical }, estilos.container]}
            >
                {alertas.map((alerta) => (
                    <Alerta key={alerta.id} alerta={alerta} />
                ))}
            </Caixa>
            {children}
        </AlertaAcoesContext.Provider>
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
        flexDirection: "column",
        pointerEvents: "box-none",
        rowGap: tema.layout.espacamentos.medio,
    }
});
