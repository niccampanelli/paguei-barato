import { Botao, Caixa, CaixaScroll, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useAuthContext } from "@/context/auth/authContext";
import { selectCadastro } from "@/store/cadastro/cadastroSlice";
import { criarAlerta } from "@/store/alerta/alertaThunks";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Fim() {

    const router = useRouter();

    const dadosCadastro = useAppSelector(selectCadastro);
    const { cadastrar: cadastrarUsuario } = useAuthContext();
    const dispatch = useAppDispatch();

    const [carregando, setCarregando] = useState(false);
    const [falhaCadastro, setFalhaCadastro] = useState(false);
    const cadastroIniciado = useRef(false);

    function aoAvancar() {
        router.push("/(protegidas)/(abas)/inicio");
    }

    const realizarCadastro = useCallback(async () => {
        setCarregando(true);
        setFalhaCadastro(false);

        try {
            await cadastrarUsuario({
                nome: dadosCadastro.passo2Nome.nome,
                sobrenome: dadosCadastro.passo2Nome.sobrenome,
                email: dadosCadastro.passo1Email.email,
                senha: dadosCadastro.passo3Senha.senha,
                cep: dadosCadastro.passo4Endereco.cep,
            });
        } catch (erro) {
            setFalhaCadastro(true);
            dispatch(criarAlerta({
                iconeNome: "x-circle",
                variante: "vermelho",
                mensagem: erro instanceof Error
                    ? erro.message
                    : "Não foi possível concluir o cadastro. Tente novamente.",
            }));
        } finally {
            setCarregando(false);
        }
    }, [cadastrarUsuario, dadosCadastro, dispatch]);

    useEffect(() => {
        if (cadastroIniciado.current)
            return;

        cadastroIniciado.current = true;
        realizarCadastro();
    }, [realizarCadastro]);

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
                {falhaCadastro &&
                    <Texto variante="texto">
                        Não foi possível concluir seu cadastro. Tente novamente.
                    </Texto>
                }
            </CaixaScroll>
            <Caixa tamanho="grande" style={{ flexDirection: "row" }}>
                <Botao
                    variante="destaque"
                    disabled={carregando}
                    onPress={falhaCadastro ? realizarCadastro : aoAvancar}
                    style={{ flex: 1 }}
                    iconeNome={falhaCadastro ? "refresh-cw" : "arrow-right-circle"}
                >
                    {falhaCadastro ? "Tentar novamente" : "Começar a economizar!"}
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