import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Autenticacao/Login";
import Cadastro from "./components/Autenticacao/Cadastro";
import NavegacaoApp from "./components/App/NavegacaoApp";
import Constants from "expo-constants";
import variaveisEstilo from "./variaveisEstilo";

export default function StackExterna() {

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: variaveisEstilo.cores.fundoPrincipal } }}>
				<Stack.Group>
					<Stack.Screen name="login" component={Login} />
					<Stack.Screen name="cadastro" component={Cadastro} />
				</Stack.Group>
				<Stack.Screen name="app" component={NavegacaoApp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
