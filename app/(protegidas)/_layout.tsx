import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function LayoutProtegidas() {

    return (
        <Stack>
            <Stack.Screen name="(abas)" />
            <Stack.Screen name="estoque" />
            <Stack.Screen name="mercado" />
            <Stack.Screen name="produto" />
        </Stack>
    );
}
