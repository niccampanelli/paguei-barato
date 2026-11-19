import { LucideIconName } from "@react-native-vector-icons/lucide";

type ItemMenuIcone = LucideIconName;

type ItemMenuLogado = "logado" | "deslogado" | "ambos";

export interface ItemMenu {
    icone: ItemMenuIcone;
    nome: string;
    aoPressionar: () => void;
    itemMenuLogado?: ItemMenuLogado;
}