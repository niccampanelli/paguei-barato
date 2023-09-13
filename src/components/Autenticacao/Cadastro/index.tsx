import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import EtapaNome from "./Nome";
import EtapaEmail from "./Email";
import EtapaSenha from "./Senha";
import EtapaCep from "./Cep";
import EtapaEndereco from "./Endereco";
import EtapaFinal from "./Final";
import { useEstilos } from "./styles";
import { Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StackExternaRoutesParams } from "../../../StackExterna";
import CadastroProvider, { useCadastroContext } from "../../../util/context/providers/cadastroProvider";


export type FluxoCadastroParams = {
    etapaNome: undefined;
    etapaEmail: undefined;
    etapaSenha: undefined;
    etapaCep: undefined;
    etapaEndereco: undefined;
    etapaFinal: undefined;
};

type CadastroProps = NativeStackScreenProps<StackExternaRoutesParams, "cadastro">;

export default function Cadastro({ navigation, route }: CadastroProps) {

    const { estilos } = useEstilos();
    const { temaAtivo } = useTemaContext();
    const { propriedadesTema } = useTemaContext();
    const { mostraBanner } = useCadastroContext();

    const FluxoCadastro = createNativeStackNavigator<FluxoCadastroParams>();

    return (
        <CadastroProvider>
            <View style={estilos.main}>
                {mostraBanner ?
                    <>
                        <StatusBar hidden />
                        <Image style={estilos.banner} source={require("../../../../assets/fundo_cadastro.jpg")} />
                    </>
                    :
                    <>
                        <StatusBar style={temaAtivo === "claro" ? "dark" : "light"} backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
                    </>
                }
                <FluxoCadastro.Navigator initialRouteName="etapaNome" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
                    <FluxoCadastro.Screen name="etapaNome" component={EtapaNome} options={{ animation: "slide_from_right" }} />
                    <FluxoCadastro.Screen name="etapaEmail" component={EtapaEmail} options={{ animation: "slide_from_right" }} />
                    <FluxoCadastro.Screen name="etapaSenha" component={EtapaSenha} options={{ animation: "slide_from_right" }} />
                    <FluxoCadastro.Screen name="etapaCep" component={EtapaCep} options={{ animation: "slide_from_right" }} />
                    <FluxoCadastro.Screen name="etapaEndereco" component={EtapaEndereco} options={{ animation: "slide_from_right" }} />
                    <FluxoCadastro.Screen name="etapaFinal" component={EtapaFinal} options={{ animation: "slide_from_right" }} />
                </FluxoCadastro.Navigator>
            </View>
        </CadastroProvider>
    );
}