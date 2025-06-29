import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Campo from "@/components/Campo";
import Logo from "@/components/Logo";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function Login() {

    const router = useRouter();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={tema.layout.espacamentos.medio}
        >
            <View style={estilos.container}>
                <Image
                    height={350}
                    style={{
                        height: 350,
                        width: "auto",
                    }}
                    source={require("../../assets/images/app/fundoAutenticacao.png")}
                />
                <CaixaScroll
                    tamanho="grande"
                    contentContainerStyle={{
                        rowGap: tema.layout.espacamentos.grande
                    }}
                >
                    <Logo
                        largura={200}
                        style={{ marginBottom: tema.layout.espacamentos.grande }}
                    />
                    <Texto variante="titulo">
                        Vamos começar a economizar?
                    </Texto>
                    <Campo
                        placeholder="Escreva o seu e-mail"
                        iconeNome="at-sign"
                    />
                    <Campo
                        placeholder="Insira a sua senha"
                        iconeNome="lock"
                    />
                    <View style={estilos.acoesPrincipais}>
                        <Botao
                            variante="info"
                            style={{ flex: 1 }}
                            onPress={() => router.push("/(desprotegidas)/cadastro/passo1Email")}
                        >
                            Cadastre-se
                        </Botao>
                        <Botao
                            variante="destaque"
                            style={{ flex: 2 }}
                        >
                            Entrar com sua conta
                        </Botao>
                    </View>
                    <Texto
                        variante="legenda"
                        cor="claro"
                        style={{ textAlign: "center" }}
                    >
                        ou
                    </Texto>
                    <Botao variante="info" onPress={() => router.push("/(protegidas)/(abas)/inicio")}>
                        Continuar sem conta
                    </Botao>
                </CaixaScroll>
            </View>
        </KeyboardAvoidingView>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    acoesPrincipais: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: tema.layout.espacamentos.grande,
    }
});