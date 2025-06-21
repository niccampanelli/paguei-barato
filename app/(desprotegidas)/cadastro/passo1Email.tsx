import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Passo1Email() {

    return (
        <View>
            <Text>Passo 1</Text>
            <Link href="/(desprotegidas)/cadastro/passo2Nome">
                <Text>Próximo</Text>
            </Link>
            <Link href="/(desprotegidas)/login">
                Voltar
            </Link>
        </View>
    )
}