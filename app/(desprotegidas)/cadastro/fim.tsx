import { Botao, Caixa, CaixaScroll, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import autenticacaoService from "@/services/autenticacaoService";
import { selectCadastro } from "@/store/cadastro/cadastroSlice";
import { setUsuario } from "@/store/usuario/usuarioSlice";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Fim() {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const dadosCadastro = useAppSelector(selectCadastro);

    const [carregando, setCarregando] = useState(false);

    async function cadastrar() {
        setCarregando(true);
        const resposta = await autenticacaoService.cadastrar(dadosCadastro);
        setCarregando(false);
        dispatch(setUsuario({
            nome: dadosCadastro.passo2Nome.nome,
            sobrenome: dadosCadastro.passo2Nome.sobrenome,
            nomeCompleto: dadosCadastro.passo2Nome.nome + " " + dadosCadastro.passo2Nome.sobrenome,
            email: dadosCadastro.passo1Email.email,
            logado: true,
            cep: dadosCadastro.passo4Endereco.cep,
        }))
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
                    iconeNome="arrow-right-circle"
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