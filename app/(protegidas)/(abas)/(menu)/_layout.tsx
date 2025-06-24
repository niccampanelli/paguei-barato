import { Stack } from "expo-router";

export default function LayoutMenus() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "transparent",
                },
            }}
        >
            <Stack.Screen name="menu" />
            <Stack.Screen name="usuario" />
            <Stack.Screen name="sobre" />
        </Stack>
    )
}