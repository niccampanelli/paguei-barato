import { FormularioLogin } from "@/components/login";
import { Botao, CaixaScroll, Logo, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { LoginSchema } from "@/schemas/login";
import { criarAlerta } from "@/store/alerta/alertaThunks";
import { fazerLogin } from "@/store/usuario/usuarioThunks";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function Login() {

    const router = useRouter();

    const dispatch = useAppDispatch();

    async function aoEntrar(dados: LoginSchema) {
        await dispatch(fazerLogin(dados));
        router.push("/(protegidas)/(abas)/inicio");
    }

    function aoEntrarInvalido() {
        dispatch(criarAlerta({
            iconeNome: "x-circle",
            variante: "vermelho",
            mensagem: "Informações de login inválidas",
        }));
    }

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
                    <FormularioLogin
                        aoSubmeter={aoEntrar}
                        aoSubmeterInvalido={aoEntrarInvalido}
                    />
                    <Texto
                        variante="legenda"
                        cor="claro"
                        style={{ textAlign: "center" }}
                    >
                        ou
                    </Texto>
                    <Botao
                        variante="info"
                        iconeNome="arrow-right"
                        onPress={() => router.push("/(protegidas)/(abas)/inicio")}
                    >
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
});