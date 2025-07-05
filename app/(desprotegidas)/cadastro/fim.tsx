import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppSelector } from "@/hooks/store";
import { selectCadastro } from "@/store/slices/cadastro";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Fim() {

    const router = useRouter();
    const dadosCadastro = useAppSelector(selectCadastro);

    function aoAvancar() {
        router.push("/(protegidas)/(abas)/inicio");
    }

    return (
        <View style={{ flex: 1 }}>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <Texto variante="subtitulo">
                    Prazer em te conhecer, {dadosCadastro.passo2Nome.nome}!
                </Texto>
            </CaixaScroll>
            <Caixa tamanho="grande" style={{ flexDirection: "row" }}>
                <Botao
                    variante="destaque"
                    onPress={aoAvancar}
                    style={{ flex: 1 }}
                >
                    Começar a economizar!
                </Botao>
            </Caixa>
        </View>
    )
}

const estilos = StyleSheet.create({
    conteudo: {
        rowGap: tema.layout.espacamentos.grande,
        paddingTop: 0,
    },
});