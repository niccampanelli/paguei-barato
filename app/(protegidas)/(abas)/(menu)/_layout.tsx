import { Stack } from "expo-router";

export default function LayoutMenus() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "transparent",
                },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="menu" />
            <Stack.Screen name="usuario" />
            <Stack.Screen name="sobre" />
        </Stack>
    )
}