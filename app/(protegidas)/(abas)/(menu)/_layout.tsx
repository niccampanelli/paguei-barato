import { Stack } from "expo-router";

export default function LayoutMenu() {

    return (
        <Stack>
            <Stack.Screen name="menu" />
            <Stack.Screen name="usuario" />
            <Stack.Screen name="sobre" />
        </Stack>
    )
}