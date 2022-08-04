import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import Inicio from "./Inicio";
import Busca from "./Busca";
import Lista from "./Lista";
import Menu from "./Menu";

export default function NavegacaoApp() {

	const Tabs = createBottomTabNavigator();

	return (
		<Tabs.Navigator initialRouteName="inicio" screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="inicio" component={Inicio} />
			<Tabs.Screen name="busca" component={Busca} />
			<Tabs.Screen name="lista" component={Lista} />
			<Tabs.Screen name="menu" component={Menu} />
		</Tabs.Navigator>
	);
}
