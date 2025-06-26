import { tema } from "@/constants/tema";
import { BotaoProps } from "@/types/components/Botao";
import { Pressable } from "react-native";
import Texto from "../Texto";

export default function Botao({
    children,
    variante = "destaque",
    ...resto
}: BotaoProps) {

    return (
        <Pressable
            style={({ pressed }) => ({
                backgroundColor: pressed
                    ? tema.cores[variante].escuro
                    : tema.cores[variante].normal
            })}
            {...resto}
        >
            <Texto>
                {children}
            </Texto>
        </Pressable>
    );
}