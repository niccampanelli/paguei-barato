import { Stack } from 'expo-router';

export default function LayoutDesprotegidas() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "transparent",
                },
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
        </Stack>
    );
}
