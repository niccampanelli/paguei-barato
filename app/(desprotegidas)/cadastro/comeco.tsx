import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
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
                    Aqui nós fazemos as compras valerem mais. Com um cadastro rápido você pode fazer parte dessa comunidade que compartilha os melhores preços da região!
                </Texto>
                <Texto variante="texto">
                    Precisamos apenas de alguns dados essenciais para te identificar e manter tudo funcionando direitinho.
                </Texto>
            </CaixaScroll>
            <Caixa
                tamanho="grande"
                style={estilos.rodape}
            >
                <Botao
                    variante="info"
                    onPress={aoVoltar}
                >
                    Voltar
                </Botao>
                <Botao
                    variante="destaque"
                    onPress={aoAvancar}
                    style={{ flex: 1 }}
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