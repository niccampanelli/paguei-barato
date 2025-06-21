import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function LayoutDesprotegidas() {

    return (
        <Stack>
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="login" />
        </Stack>
    );
}
