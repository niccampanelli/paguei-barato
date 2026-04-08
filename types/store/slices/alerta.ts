import { TemaCores } from "@/types/contants/tema";
import Feather from "@expo/vector-icons/Feather";

type AlertaIconeNome = keyof typeof Feather.glyphMap;

type AlertaVariante = keyof Omit<TemaCores, "fundo" | "texto">;

interface Alerta {
    id: number;
    mensagem: string;
    iconeNome: AlertaIconeNome;
    variante?: AlertaVariante;
    textoAcao?: string;
    acaoId?: string;
}

export interface AlertaState {
    alertas: Alerta[];
}