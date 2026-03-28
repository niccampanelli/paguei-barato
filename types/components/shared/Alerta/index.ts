import Feather from "@expo/vector-icons/Feather";

type AlertaIconeNome = keyof typeof Feather.glyphMap;

interface Alerta {
    id: number;
    iconeNome: AlertaIconeNome;
    mensagem: string;
}

export interface AlertaProps {
    alerta: Alerta;
}
