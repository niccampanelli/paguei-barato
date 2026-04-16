import Feather from "@expo/vector-icons/Feather";

type ItemMenuIcone = keyof typeof Feather.glyphMap;

type ItemMenuLogado = "logado" | "deslogado" | "ambos";

export interface ItemMenu {
    icone: ItemMenuIcone;
    nome: string;
    aoPressionar: () => void;
    itemMenuLogado?: ItemMenuLogado;
}