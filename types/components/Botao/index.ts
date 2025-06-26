import { TemaCores } from "@/types/contants/tema";
import { ReactNode } from "react";
import { PressableProps } from "react-native";

type BotaoPropsVariantes = keyof Omit<TemaCores, "fundo" | "texto">;

export interface BotaoProps extends PressableProps {
    children: ReactNode;
    variante?: BotaoPropsVariantes;
}