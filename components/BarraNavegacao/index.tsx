import Feather from "@expo/vector-icons/Feather";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Botao from "../Botao";
import Caixa from "../Caixa";

export default function BarraNavegacao({
    state,
    navigation,
    descriptors,
}: BottomTabBarProps) {

    const insets = useSafeAreaInsets();

    function obterTitulo(key: string, index: number) {
        if (state.index !== index)
            return undefined;

        const opcoes = descriptors[key].options;

        if (opcoes.tabBarLabel) {
            if (typeof opcoes.tabBarLabel === "string")
                return opcoes.tabBarLabel;

            return opcoes.tabBarLabel({
                color: opcoes.tabBarActiveTintColor ?? "black",
                focused: true,
                children: "",
                position: opcoes.tabBarLabelPosition ?? "below-icon"
            })
        }
    }

    function obterIcone(key: string, index: number): keyof typeof Feather.glyphMap {
        const opcoes = descriptors[key].options;

        if (opcoes.tabBarIcon) {
            return opcoes.tabBarIcon({
                color: opcoes.tabBarActiveTintColor ?? "black",
                focused: state.index === index,
                size: 20
            }) as keyof typeof Feather.glyphMap;
        }

        return "alert-octagon";
    }

    function aoPressionar(route: NavigationRoute<ParamListBase, string>, index: number) {
        const evento = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (state.index !== index && !evento.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    }

    return (
        <Caixa
            tamanho="grande"
            style={[
                {
                    paddingBottom: insets.bottom,
                },
                estilos.barra
            ]}
        >
            {
                state.routes.map((route, index) => (
                    <Botao
                        key={index}
                        variante={state.index === index ? "destaque" : "info"}
                        iconeNome={obterIcone(route.key, index)}
                        iconeLado="esquerda"
                        onPress={() => aoPressionar(route, index)}
                    >
                        {obterTitulo(route.key, index)}
                    </Botao>
                ))
            }
        </Caixa>
    );
}

const estilos = StyleSheet.create({
    barra: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});