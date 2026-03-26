import Caixa from "@/components/shared/Caixa";
import CaixaScroll from "@/components/shared/Caixa/CaixaScroll";
import Logo from "@/components/shared/Logo";
import Texto from "@/components/shared/Texto";
import { tema } from "@/constants/tema";
import { useAppSelector } from "@/hooks/store";
import { selectUsuario } from "@/store/slices/usuario";
import { StyleSheet, View } from "react-native";

export default function Inicio() {

    const usuario = useAppSelector(selectUsuario);

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
                    Boa noite, {usuario.nome}!
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