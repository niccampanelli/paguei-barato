import { BarraNavegacao } from '@/components/shared';
import { LucideIconName } from "@react-native-vector-icons/lucide";
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
                animation: "shift",
            }}
            tabBar={(props) => <BarraNavegacao {...props} />}
        >
            <Tabs.Screen
                name="inicio"
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: () => "home" as LucideIconName
                }}
            />
            <Tabs.Screen
                name="busca"
                options={{
                    tabBarLabel: 'Busca',
                    tabBarIcon: () => "search" as LucideIconName
                }}
            />
            <Tabs.Screen
                name="lista"
                options={{
                    tabBarLabel: 'Lista',
                    tabBarIcon: () => "layout-list" as LucideIconName
                }}
            />
            <Tabs.Screen
                name="(menu)"
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: () => "menu" as LucideIconName
                }}
            />
        </Tabs>
    )
}