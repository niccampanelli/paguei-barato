import { tema } from '@/constants/tema';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LayoutDesprotegidas() {

    const insets = useSafeAreaInsets();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom",
                contentStyle: {
                    backgroundColor: tema.cores.fundo.principal,
                    marginBottom: insets.bottom
                },
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
        </Stack>
    );
}
