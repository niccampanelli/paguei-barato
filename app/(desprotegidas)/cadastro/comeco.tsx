import { Botao, Caixa, CaixaScroll, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Comeco() {

    const router = useRouter();

    function aoVoltar() {
        router.back();
    }

    function aoAvancar() {
        router.navigate("/(desprotegidas)/cadastro/passo1Email");
    }

    return (
        <View style={{ flex: 1 }}>
            <CaixaScroll
                tamanho="grande"
                style={estilos.formulario}
                contentContainerStyle={estilos.conteudo}
            >
                <Texto variante="subtitulo">
                    Juntos para fazer o dinheiro render!
                </Texto>
                <Texto variante="texto">
                    Com menos de dois minutos, você pode se cadastrar e fazer parte dessa comunidade que sabe onde encontrar os produtos mais baratos.
                </Texto>
                <Texto variante="texto">
                    Depois de se cadastrar você vai conseguir adicionar produtos e informar os preços que encontrar nos mercados e lojas da sua região.
                </Texto>
                <Texto variante="texto">
                    Precisamos apenas de algumas informações para conseguirmos te identificar e manter tudo funcionando direitinho!
                </Texto>
            </CaixaScroll>
            <Caixa
                tamanho="grande"
                style={estilos.rodape}
            >
                <Botao
                    variante="info"
                    onPress={aoVoltar}
                    iconeNome="arrow-left"
                    iconeLado="esquerda"
                >
                    Voltar
                </Botao>
                <Botao
                    variante="destaque"
                    onPress={aoAvancar}
                    style={{ flex: 1 }}
                    iconeNome="arrow-right"
                >
                    Iniciar cadastro
                </Botao>
            </Caixa>
        </View>
    )
}

const estilos = StyleSheet.create({
    formulario: {
        flex: 1,
    },
    conteudo: {
        rowGap: tema.layout.espacamentos.medio,
        paddingVertical: 0,
    },
    rodape: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
    },
});