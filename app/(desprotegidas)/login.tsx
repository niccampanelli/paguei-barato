import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Logo from "@/components/Logo";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { Image, StyleSheet, View } from "react-native";

export default function Login() {

    return (
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
                <Logo largura={200} />
                <Texto variante="titulo">
                    Que tal fazer login?
                </Texto>
                <Botao>
                    Fazer login
                </Botao>
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    }
});