import { Stack } from "expo-router";

export default function LayoutCadastro() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="passo1Email" />
            <Stack.Screen name="passo2Nome" />
            <Stack.Screen name="passo3Senha" />
            <Stack.Screen name="passo4Endereco" />
            <Stack.Screen name="passo5Final" />
        </Stack>
    )
}