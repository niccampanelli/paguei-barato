import { GestureResponderEvent, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FluxoCadastroParams } from "..";
import Logo from "../../../Logo";
import Texto from "../../../Texto";
import { Feather } from "@expo/vector-icons";
import Botao from "../../../Botao";
import { useEstilos } from "../styles";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { useCadastroContext } from "../../../../util/context/providers/cadastroProvider";

type EtapaFinalProps = NativeStackScreenProps<FluxoCadastroParams, "etapaFinal">;

export default function EtapaFinal({ navigation, route }: EtapaFinalProps) {

    const { getValues, setMostraBanner, finalizarCadastro, carregando } = useCadastroContext();

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const proximo = (e: GestureResponderEvent) => {
        e.preventDefault();

        navigation.getParent()?.navigate("app");
    };

    const concluir = async () => {
        await finalizarCadastro!().catch(() => {
            navigation.getParent()?.navigate("login");
        });
    };

    useEffect(() => {
        setMostraBanner!(false);
        concluir();

        navigation.addListener('beforeRemove', e => {
            if (e.data.action.type === "GO_BACK")
                e.preventDefault();
            return;
        });

        return () => {
            navigation.removeListener('beforeRemove', () => { });
        };
    }, []);

    const escalaIcone = useSharedValue(0);

    const animacaoIcone = useAnimatedStyle(() => {

        escalaIcone.value = 1;

        return {
            transform: [
                { scale: withDelay(500, withSpring(escalaIcone.value)) }
            ]
        }
    }, []);

    return (
        <View style={estilos.containerFim}>
            <Logo style={estilos.logo} />
            <Animated.View style={[estilos.cadastroFim, animacaoIcone]}>
                <Feather name="check-circle" style={estilos.cadastroFimIcone} />
            </Animated.View>
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>Tudo pronto!</Texto>
                <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Prazer em te conhecer, {getValues!().nome}!</Texto>
                <Texto style={[estiloGlobal.label, estilos.label]}>Seu cadastro está concluído. Agora você pode cadastrar mercados e produtos e informar os preços que você encontrar.</Texto>
                <Texto style={[estiloGlobal.label, estilos.label]}>Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.</Texto>
            </View>
            <Botao titulo={carregando ? "Preparando sua economia..." : "Comece à economizar!"} disabled={carregando} icone="arrow-right" onPress={proximo} />
        </View>
    );
};