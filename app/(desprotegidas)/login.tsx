import FormularioLogin from "@/components/app/(desprotegidas)/login/FormularioLogin";
import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
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
                    <FormularioLogin
                        onSubmit={(data) => {
                            console.log("Dados do formulário:", data);
                            // Aqui você pode adicionar a lógica de autenticação
                        }}
                    />
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
});