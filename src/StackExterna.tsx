import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Autenticacao/Login";
import Cadastro from "./components/Autenticacao/Cadastro";
import NavegacaoApp from "./components/App/NavegacaoApp";
import DetalhesProduto from "./components/App/Inicio/DetalhesProduto";
import DetalhesMercado from "./components/App/Inicio/DetalhesMercado";
import DetalhesEstoque from "./components/App/Inicio/DetalhesEstoque";
import { useTemaContext } from "./util/context/providers/temaProvider";

export default function StackExterna() {

	const Stack = createNativeStackNavigator();
	const { propriedadesTema } = useTemaContext();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
				<Stack.Group>
					<Stack.Screen name="login" component={Login} />
					<Stack.Screen name="cadastro" options={{ animation: "slide_from_left" }} component={Cadastro} />
				</Stack.Group>
				<Stack.Group>
					<Stack.Screen name="app" options={{ animation: "slide_from_right" }} component={NavegacaoApp} />
					<Stack.Screen name="detalhesProduto" options={{ animation: "slide_from_right" }} component={DetalhesProduto} />
					<Stack.Screen name="detalhesMercado" options={{ animation: "slide_from_right" }} component={DetalhesMercado} />
					<Stack.Screen name="detalhesEstoque" options={{ animation: "slide_from_right" }} component={DetalhesEstoque} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
