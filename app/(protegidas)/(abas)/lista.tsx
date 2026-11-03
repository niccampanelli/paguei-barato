import { Botao, Caixa, Texto } from "@/components/shared";
import { useAuthContext } from "@/context/auth/authContext";
import { definirIntencaoDeAutenticacao } from "@/services/authIntent";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Lista() {
    const router = useRouter();
    const { status } = useAuthContext();

    if (status !== "autenticado") {
        return (
            <View>
                <Caixa tamanho="grande">
                    <Texto variante="titulo">Lista de compras</Texto>
                    <Texto variante="texto">
                        Entre na sua conta para salvar e acompanhar seus relatos.
                    </Texto>
                    <Botao
                        variante="destaque"
                        onPress={() => {
                            definirIntencaoDeAutenticacao("/(protegidas)/(abas)/lista");
                            router.push("/(desprotegidas)/login");
                        }}
                        iconeNome="log-in"
                    >
                        Entrar
                    </Botao>
                </Caixa>
            </View>
        );
    }

    return (
        <View></View>
    )
}