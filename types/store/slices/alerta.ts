import { TemaCores } from "@/types/contants/tema";
import { LucideIconName } from "@react-native-vector-icons/lucide";

type AlertaIconeNome = LucideIconName;

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