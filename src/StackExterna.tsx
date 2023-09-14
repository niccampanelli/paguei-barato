import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Autenticacao/Login";
import Cadastro from "./components/Autenticacao/Cadastro";
import NavegacaoApp, { NavegacaoAppRoutesParams } from "./components/App/NavegacaoApp";
import DetalhesProduto, { DetalhesProdutoParams } from "./components/App/Inicio/DetalhesProduto";
import DetalhesMercado, { DetalhesMercadoParams } from "./components/App/Inicio/DetalhesMercado";
import DetalhesEstoque, { DetalhesEstoqueParams } from "./components/App/Inicio/DetalhesEstoque";
import { useTemaContext } from "./util/context/providers/temaProvider";
import { useAuthContext } from "./util/context/providers/authProvider";
import CriarProduto from "./components/App/Inicio/CriarProduto";
import CriarMercado from "./components/App/Inicio/CriarMercado";
import CriarSugestao from "./components/App/Inicio/CriarSugestao";

export type StackExternaRoutesParams = {
	login: undefined;
	cadastro: undefined;
	app: NavigatorScreenParams<NavegacaoAppRoutesParams>;
	detalhesProduto: DetalhesProdutoParams;
	detalhesMercado: DetalhesMercadoParams;
	detalhesEstoque: DetalhesEstoqueParams;
	criarProduto: undefined;
	criarMercado: undefined;
	criarSugestao: undefined;
};

export default function StackExterna() {

	const Stack = createNativeStackNavigator<StackExternaRoutesParams>();
	const { propriedadesTema } = useTemaContext();
	const { usuarioLogado } = useAuthContext();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={usuarioLogado ? "app" : "login"} screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
				<Stack.Group>
					<Stack.Screen name="login" component={Login} />
					<Stack.Screen name="cadastro" options={{ animation: "slide_from_right" }} component={Cadastro} />
				</Stack.Group>
				<Stack.Group>
					<Stack.Screen name="app" options={{ animation: "slide_from_right" }} component={NavegacaoApp} />
					<Stack.Screen name="detalhesProduto" options={{ animation: "slide_from_right" }} component={DetalhesProduto} />
					<Stack.Screen name="detalhesMercado" options={{ animation: "slide_from_right" }} component={DetalhesMercado} />
					<Stack.Screen name="detalhesEstoque" options={{ animation: "slide_from_right" }} component={DetalhesEstoque} />
					<Stack.Screen name="criarProduto" options={{ animation: "slide_from_right" }} component={CriarProduto} />
					<Stack.Screen name="criarMercado" options={{ animation: "slide_from_right" }} component={CriarMercado} />
					<Stack.Screen name="criarSugestao" options={{ animation: "slide_from_right" }} component={CriarSugestao} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}