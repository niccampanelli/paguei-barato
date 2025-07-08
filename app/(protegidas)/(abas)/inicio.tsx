import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Logo from "@/components/Logo";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { StyleSheet, View } from "react-native";

export default function Inicio() {

    return (
        <View style={estilos.container}>
            <Caixa
                tamanho="grande"
                style={{ paddingBottom: 0 }}
            >
                <Logo />
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <Texto variante="subtitulo">
                    Boa noite, Nicholas!
                </Texto>
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: tema.layout.espacamentos.grande,
    },
    conteudo: {
        flex: 1,
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.grande,
    },
});