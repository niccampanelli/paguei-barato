import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";

export default function LayoutAbasPrincipais() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="inicio"
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: () => <Feather size={20} name='home' />
                }}
            />
            <Tabs.Screen
                name="busca"
                options={{
                    tabBarLabel: 'Busca',
                    tabBarIcon: () => <Feather size={20} name='search' />
                }}
            />
            <Tabs.Screen
                name="lista"
                options={{
                    tabBarLabel: 'Lista',
                    tabBarIcon: () => <Feather size={20} name='shopping-bag' />
                }}
            />
            <Tabs.Screen
                name="(menu)"
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: () => <Feather size={20} name='menu' />
                }}
            />
        </Tabs>
    )
}