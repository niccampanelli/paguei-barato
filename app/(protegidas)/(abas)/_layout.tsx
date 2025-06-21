import { Tabs } from "expo-router";

export default function LayoutAbasPrincipais() {

    return (
        <Tabs>
            <Tabs.Screen name="inicio" />
            <Tabs.Screen name="busca" />
            <Tabs.Screen name="lista" />
            <Tabs.Screen name="(menu)" />
        </Tabs>
    )
}