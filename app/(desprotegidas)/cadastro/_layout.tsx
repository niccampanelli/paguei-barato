import BarraEtapas from "@/components/BarraEtapas";
import Caixa from "@/components/Caixa";
import Logo from "@/components/Logo";
import { tema } from "@/constants/tema";
import { Stack } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LayoutCadastro() {

    const insets = useSafeAreaInsets();

    const [etapaAtual, setEtapaAtual] = useState(0);

    const ETAPAS = new Map<string, number>([
        ["passo1Email", 1],
        ["passo2Nome", 2],
        ["passo3Senha", 3],
        ["passo4Endereco", 4],
        ["passo5Final", 5],
    ]);

    return (
        <View style={{
            flex: 1,
            paddingTop: etapaAtual === ETAPAS.size - 1 ? insets.top : undefined,
        }}>
            {etapaAtual !== ETAPAS.size - 1 &&
                <Image
                    height={350}
                    style={{
                        height: 200,
                        width: "auto",
                    }}
                    source={require("../../../assets/images/app/fundoCadastro.jpg")}
                />
            }
            <Caixa
                tamanho="grande"
                style={{ rowGap: tema.layout.espacamentos.grande }}
            >
                <Logo
                    largura={200}
                    style={{ marginBottom: tema.layout.espacamentos.grande }}
                />
                <BarraEtapas
                    totalEtapas={ETAPAS.size}
                    etapaAtual={etapaAtual}
                    variantes="destaque"
                />
            </Caixa>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    contentStyle: {
                        backgroundColor: tema.cores.fundo.principal,
                        marginBottom: insets.bottom
                    },
                }}
                screenListeners={{
                    state: (e) => {
                        const key = e.data.state.key;
                        setEtapaAtual(ETAPAS.get(key) ?? 1);
                    }
                }}
            >
                <Stack.Screen name="passo1Email" />
                <Stack.Screen name="passo2Nome" />
                <Stack.Screen name="passo3Senha" />
                <Stack.Screen name="passo4Endereco" />
                <Stack.Screen name="passo5Final" />
            </Stack>
        </View>
    )
}