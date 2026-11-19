import { TemaCores } from "@/types/contants/tema";
import { LucideIconName } from "@react-native-vector-icons/lucide";

type AlertaPropsAlertaIconeNome = LucideIconName;

type AlertaPropsVariante = keyof Omit<TemaCores, "fundo" | "texto">;

interface AlertaPropsAlerta {
    id: number;
    iconeNome: AlertaPropsAlertaIconeNome;
    mensagem: string;
    variante?: AlertaPropsVariante;
    textoAcao?: string;
    acaoId?: string;
}

export interface AlertaProps {
    alerta: AlertaPropsAlerta;
}
