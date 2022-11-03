import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Inicio from "./Inicio";
import Busca from "./Busca";
import Lista from "./Lista";
import Menu from "./Menu";
import BarraNavegacao from "./BarraNavegacao";
import estiloBarraNavegacao from "./BarraNavegacao/styles";
import { Feather } from "@expo/vector-icons";
import variaveisEstilo from "../../variaveisEstilo";

export default function NavegacaoApp() {

	const Tabs = createBottomTabNavigator();

	return (
		<Tabs.Navigator sceneContainerStyle={{ backgroundColor: variaveisEstilo.cores.fundoPrincipal }} initialRouteName="inicio" screenOptions={{ headerShown: false }} tabBar={(props: BottomTabBarProps) => <BarraNavegacao {...props} />}>
			<Tabs.Screen name="inicio" options={{
				tabBarLabel: "Início",
				tabBarIcon: ({ focused }) =>
					<Feather
						name="home"
						style={focused ?
							estiloBarraNavegacao.botaoSelecionadoIcone :
							estiloBarraNavegacao.botaoNormalIcone
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
							estiloBarraNavegacao.botaoSelecionadoIcone :
							estiloBarraNavegacao.botaoNormalIcone
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
							estiloBarraNavegacao.botaoSelecionadoIcone :
							estiloBarraNavegacao.botaoNormalIcone
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
							estiloBarraNavegacao.botaoSelecionadoIcone :
							estiloBarraNavegacao.botaoNormalIcone
						}
					/>
			}}
				component={Menu}
			/>
		</Tabs.Navigator>
	);
}
