import Feather from "@expo/vector-icons/Feather";

type AlertaIconeNome = keyof typeof Feather.glyphMap;

interface AlertaProps {
    id: number;
    mensagem: string;
    iconeNome: AlertaIconeNome;
}

export interface AlertaState {
    alertas: AlertaProps[];
}