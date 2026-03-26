import { TemaCores } from "@/types/contants/tema";
import { ViewProps } from "react-native";

type BarraEtapasPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

export interface BarraEtapasProps extends ViewProps {
    /** 
     * Total de etapas para mostrar na barra
     * @default 2
     */
    totalEtapas: number;
    /**
     * Etapa atual, começando de 0
     * @default 0
     */
    etapaAtual: number;
    /**
     * Variante de cor da barra
     * @default "destaque"
     */
    variantes?: BarraEtapasPropsVariantes;
}