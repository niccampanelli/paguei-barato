import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Autenticacao/Login";
import Cadastro from "./components/Autenticacao/Cadastro";
import NavegacaoApp from "./components/App/NavegacaoApp";
import variaveisEstilo from "./variaveisEstilo";

export default function StackExterna() {

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="app" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: variaveisEstilo.cores.fundoPrincipal } }}>
				<Stack.Group>
					<Stack.Screen name="login" component={Login} />
					<Stack.Screen options={{animation: "fade_from_bottom"}} name="cadastro" component={Cadastro} />
				</Stack.Group>
				<Stack.Screen name="app" options={{animation: "slide_from_right"}} component={NavegacaoApp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
