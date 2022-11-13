import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useEstilos } from "./styles";

export default function BarraNavegacao({ descriptors, state, navigation }: BottomTabBarProps) {

    const { estilos } = useEstilos();

    interface ComponenteBotaoProps {
        propsRota: Route<any>,
        indice: number
    }

    const BotaoNavegacao = ({propsRota, indice}: ComponenteBotaoProps) => {

        const opcoesRota = descriptors[propsRota.key].options;
        const label: string = (opcoesRota.tabBarLabel !== undefined) ? 
            opcoesRota.tabBarLabel : 
                (opcoesRota.title !== undefined) ? 
                    opcoesRota.title : propsRota.name;


        const selecionado = state.index === indice;
        const icone = opcoesRota.tabBarIcon ? opcoesRota.tabBarIcon({ focused: selecionado, color: "", size: 0 }) : <Feather name="at-sign"/>;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: propsRota.key,
                canPreventDefault: true,
            });
  
            if(selecionado === false && event.defaultPrevented === false) {
                navigation.navigate({name: propsRota.name, params: propsRota.params, merge: true});
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: propsRota.key,
            });
        };

        return (
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onLongPress}
                style={selecionado ? estilos.botaoSelecionado : estilos.botaoNormal}
            >
                { icone }
                <Text style={selecionado ? estilos.botaoSelecionadoTexto : estilos.botaoNormalTexto}>{label}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={estilos.barra}>
            { state ?
                state.routes.map((route, i) => (
                    <BotaoNavegacao key={i} propsRota={route} indice={i}/>
                ))
                :
                ""
            }
        </View>
    );
}