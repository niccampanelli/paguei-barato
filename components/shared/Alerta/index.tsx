import { tema } from "@/constants/tema";
import { AlertaProps } from "@/types/components/shared";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, View } from "react-native";
import Texto from "../Texto";

export default function Alerta({
    alerta: {
        id,
        mensagem,
        iconeNome,
        variante = "destaque"
    },
}: AlertaProps) {

    return (
        <View style={estilos.alerta}>
            <Feather
                name={iconeNome}
                size={tema.texto.tamanhos.texto}
                color={tema.cores[variante].escuro}
            />
            <Texto
                style={{ flex: 1 }}
                cor="claro"
            >
                {mensagem}
            </Texto>
        </View>
    )
}

const estilos = StyleSheet.create({
    alerta: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: tema.layout.espacamentos.medio,
        backgroundColor: tema.cores.fundo.secundario,
        borderRadius: tema.layout.raioBorda,
        paddingVertical: tema.layout.paddings.botaoGrande.vertical,
        paddingHorizontal: tema.layout.paddings.botaoGrande.horizontal,
    }
});
