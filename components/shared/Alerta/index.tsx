import { tema } from "@/constants/tema";
import { useAlertaAcoesContext } from "@/context/alerta/alertaAcoesContext";
import { AlertaProps } from "@/types/components/shared";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Texto from "../Texto";

export default function Alerta({
    alerta: {
        id,
        mensagem,
        iconeNome,
        variante = "destaque",
        textoAcao,
        acaoId,
    },
}: AlertaProps) {

    const { executarAlertaAcao } = useAlertaAcoesContext();

    function aoPressionar() {
        if (acaoId)
            executarAlertaAcao(acaoId);
    }

    return (
        <View style={estilos.alerta}>
            <Feather
                name={iconeNome}
                size={tema.texto.tamanhos.texto}
                color={tema.cores[variante].escuro}
            />
            <Texto style={{ flex: 1 }}>
                {mensagem}
            </Texto>
            {textoAcao &&
                <TouchableOpacity onPress={aoPressionar}>
                    <Texto variante="link">
                        {textoAcao}
                    </Texto>
                </TouchableOpacity>
            }
        </View>
    )
}

const estilos = StyleSheet.create({
    alerta: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: tema.layout.espacamentos.medio,
        backgroundColor: tema.cores.fundo.terciario,
        borderRadius: tema.layout.raioBorda,
        paddingVertical: tema.layout.paddings.botaoGrande.vertical,
        paddingHorizontal: tema.layout.paddings.botaoGrande.horizontal,
    }
});
