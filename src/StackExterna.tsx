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
import MenuUsuario, { MenuUsuarioParams } from "./components/App/Menu/Usuario";
import { useEffect, useState } from "react";
import CarregandoOverlay from "./components/CarregandoOverlay";
import { View } from "moti";

export type StackExternaRoutesParams = {
	carregando: undefined;
	login: undefined;
	cadastro: undefined;
	app: NavigatorScreenParams<NavegacaoAppRoutesParams>;
	detalhesProduto: DetalhesProdutoParams;
	detalhesMercado: DetalhesMercadoParams;
	detalhesEstoque: DetalhesEstoqueParams;
	criarProduto: undefined;
	criarMercado: undefined;
	criarSugestao: undefined;
	menuUsuario: MenuUsuarioParams;
};

export default function StackExterna() {

	const Stack = createNativeStackNavigator<StackExternaRoutesParams>();
	const { propriedadesTema } = useTemaContext();
	const { verificarUsuarioLogado } = useAuthContext();

	const [logado, setLogado] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		verificarUsuarioLogado().then((logado) => {
			setLogado(logado);
		});
	}, []);

	return (
		<NavigationContainer>
			{logado === undefined ?
				<View style={{ flex: 1, backgroundColor: propriedadesTema.cores.fundoPrincipal, justifyContent: "center", alignItems: "center" }} >
					<CarregandoOverlay />
				</View>
				:
				<Stack.Navigator initialRouteName={logado === true ? "app" : "login"} screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
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
						<Stack.Screen name="menuUsuario" options={{ animation: "slide_from_right" }} component={MenuUsuario} />
					</Stack.Group>
				</Stack.Navigator>
			}
		</NavigationContainer>
	);
}