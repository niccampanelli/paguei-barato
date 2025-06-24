import { Stack } from 'expo-router';

export default function LayoutProtegidas() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "transparent",
                },
            }}
        >
            <Stack.Screen name="(abas)" />
            <Stack.Screen name="estoque/[id]" />
            <Stack.Screen name="mercado/[id]" />
            <Stack.Screen name="produto/[id]" />
        </Stack>
    );
}
