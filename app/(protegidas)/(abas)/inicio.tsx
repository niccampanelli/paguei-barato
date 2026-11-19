import { Caixa, CaixaScroll, Logo, Texto } from "@/components/shared";
import BotaoExpansivel from "@/components/shared/BotaoExpansivel";
import { tema } from "@/constants/tema";
import { useAppSelector } from "@/hooks/store";
import { selectUsuario } from "@/store/usuario/usuarioSlice";
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
            <BotaoExpansivel
                iconeNome="plus"
                style={estilos.botaoCriar}
                acoes={[
                    {
                        iconeNome: "store",
                        children: "Loja"
                    },
                    {
                        iconeNome: "milk",
                        children: "Produto"
                    },
                    {
                        iconeNome: "megaphone",
                        children: "Relato"
                    },
                ]}
            >
                Criar
            </BotaoExpansivel>
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
    botaoCriar: {
        position: "absolute",
        bottom: 0,
        right: tema.layout.espacamentos.grande,
        zIndex: 1,
    },
    conteudo: {
        flex: 1,
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.grande,
    },
});