import { TemaCores } from "@/types/contants/tema";
import Feather from "@expo/vector-icons/Feather";

type AlertaPropsAlertaIconeNome = keyof typeof Feather.glyphMap;

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
