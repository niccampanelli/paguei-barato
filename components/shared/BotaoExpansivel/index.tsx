import { tema } from "@/constants/tema";
import { BotaoExpansivelProps } from "@/types/components/shared/BotaoExpansivel";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Botao from "../Botao";

export default function BotaoExpansivel({
    acoes,
    iconeNome,
    onPress,
    style,
    ...resto
}: BotaoExpansivelProps) {

    const [aberto, setAberto] = useState(false);

    function aoPressionar(ev: any) {
        setAberto(!aberto);
        onPress?.(ev);
    }

    return (
        <View style={[estilos.container, style]}>
            <View style={estilos.acoes}>
                {aberto && acoes.map((acao, index) => (
                    <Botao
                        key={index}
                        variante="secundaria"
                        {...acao}
                    />
                ))}
            </View>
            <Botao
                iconeNome={aberto ? "x" : iconeNome}
                onPress={aoPressionar}
                {...resto}
            />
        </View>
    )
};

const estilos = StyleSheet.create({
    container: {
        position: "relative",
    },
    acoes: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        position: "absolute",
        bottom: "100%",
        right: 0,
        rowGap: tema.layout.espacamentos.medio,
        marginBottom: tema.layout.espacamentos.medio,
    },
});
