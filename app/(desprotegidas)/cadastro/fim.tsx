import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppSelector } from "@/hooks/store";
import autenticacaoService from "@/services/autenticacaoService";
import { selectCadastro } from "@/store/slices/cadastro";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Fim() {

    const router = useRouter();
    const dadosCadastro = useAppSelector(selectCadastro);

    const [carregando, setCarregando] = useState(false);

    async function cadastrar() {
        setCarregando(true);
        const resposta = await autenticacaoService.cadastrar(dadosCadastro);
        setCarregando(false);
    }

    function aoAvancar() {
        router.push("/(protegidas)/(abas)/inicio");
    }

    useEffect(() => {
        cadastrar();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <Texto variante="titulo">
                    Cadastro pronto!
                </Texto>
                <Texto variante="subtitulo">
                    Prazer em te conhecer, {dadosCadastro.passo2Nome.nome}!
                </Texto>
                <Texto variante="texto">
                    Seu cadastro está concluído. Agora você vai poder cadastrar produtos e mercados, e informar os preços que você encontrar.
                </Texto>
                <Texto variante="texto">
                    Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.
                </Texto>
            </CaixaScroll>
            <Caixa tamanho="grande" style={{ flexDirection: "row" }}>
                <Botao
                    variante="destaque"
                    disabled={carregando}
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