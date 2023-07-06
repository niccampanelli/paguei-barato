import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Inicio from "./Inicio";
import Busca from "./Busca";
import Lista from "./Lista";
import Menu from "./Menu";
import BarraNavegacao from "./BarraNavegacao";
import { useEstilos } from "./BarraNavegacao/styles";
import { Feather } from "@expo/vector-icons";
import { useTemaContext } from "../../util/context/providers/temaProvider";

export type NavegacaoAppRoutesParams = {
	inicio: undefined;
	buscar: undefined;
	lista: undefined;
	menu: undefined;
}

export default function NavegacaoApp() {

	const Tabs = createBottomTabNavigator<NavegacaoAppRoutesParams>();
	const { propriedadesTema } = useTemaContext();
	const { estilos } = useEstilos();

	return (
		<Tabs.Navigator sceneContainerStyle={{ backgroundColor: propriedadesTema.cores.fundoPrincipal }} initialRouteName="inicio" screenOptions={{ headerShown: false }} tabBar={(props: BottomTabBarProps) => <BarraNavegacao {...props} />}>
			<Tabs.Screen name="inicio" options={{
				tabBarLabel: "Início",
				tabBarIcon: ({ focused }) =>
					<Feather
						name="home"
						style={focused ?
							estilos.botaoSelecionadoIcone :
							estilos.botaoNormalIcone
						}
					/>
			}}
				component={Inicio}
			/>
			<Tabs.Screen name="buscar" options={{
				tabBarLabel: "Buscar",
				tabBarIcon: ({ focused }) =>
					<Feather
						name="search"
						style={focused ?
							estilos.botaoSelecionadoIcone :
							estilos.botaoNormalIcone
						}
					/>
			}}
				component={Busca}
			/>
			<Tabs.Screen name="lista" options={{
				tabBarLabel: "Lista",
				tabBarIcon: ({ focused }) =>
					<Feather
						name="shopping-bag"
						style={focused ?
							estilos.botaoSelecionadoIcone :
							estilos.botaoNormalIcone
						}
					/>
			}}
				component={Lista}
			/>
			<Tabs.Screen name="menu" options={{
				tabBarLabel: "Menu",
				tabBarIcon: ({ focused }) =>
					<Feather
						name="menu"
						style={focused ?
							estilos.botaoSelecionadoIcone :
							estilos.botaoNormalIcone
						}
					/>
			}}
				component={Menu}
			/>
		</Tabs.Navigator>
	);
}
