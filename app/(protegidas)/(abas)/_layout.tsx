import BarraNavegacao from '@/components/BarraNavegacao';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LayoutAbasPrincipais() {

    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: "transparent",
                    paddingTop: insets.top,
                },
            }}
            tabBar={(props) => <BarraNavegacao {...props} />}
        >
            <Tabs.Screen
                name="inicio"
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: () => "home" as keyof typeof Feather.glyphMap
                }}
            />
            <Tabs.Screen
                name="busca"
                options={{
                    tabBarLabel: 'Busca',
                    tabBarIcon: () => "search" as keyof typeof Feather.glyphMap
                }}
            />
            <Tabs.Screen
                name="lista"
                options={{
                    tabBarLabel: 'Lista',
                    tabBarIcon: () => "shopping-bag" as keyof typeof Feather.glyphMap
                }}
            />
            <Tabs.Screen
                name="(menu)"
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: () => "menu" as keyof typeof Feather.glyphMap
                }}
            />
        </Tabs>
    )
}