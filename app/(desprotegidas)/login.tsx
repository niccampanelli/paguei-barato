import Texto from "@/components/Texto";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {

    return (
        <View>
            <Text>Login</Text>
            <Link href="/(desprotegidas)/cadastro/passo1Email">
                Ir para Cadastro
            </Link>
            <Link href="/(protegidas)/(abas)/inicio">
                Ir para principal
            </Link>
            <Texto>
                Olá, este é o login!
            </Texto>
        </View>
    )
}