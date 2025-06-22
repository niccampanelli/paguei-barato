import { Stack } from 'expo-router';

export default function LayoutDesprotegidas() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
        </Stack>
    );
}
