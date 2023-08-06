import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackExternaRoutesParams } from "../../../../StackExterna";
import EtapaImagens, { ImagensParams } from "./Imagens";
import EtapaInformacoes from "./Informacoes";
import { useTemaContext } from "../../../../util/context/providers/temaProvider";

type CriarMercadoProps = NativeStackScreenProps<StackExternaRoutesParams, "criarMercado">;

export type FluxoCriarMercadoParams = {
    informacoes: undefined;
    imagens: ImagensParams;
}

export default function CriarMercado({ navigation, route }: CriarMercadoProps) {

	const { propriedadesTema } = useTemaContext();

    const FluxoCriarProduto = createNativeStackNavigator<FluxoCriarMercadoParams>();

    return (
        <FluxoCriarProduto.Navigator initialRouteName="informacoes" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
            <FluxoCriarProduto.Screen name="informacoes" options={{ animation: "slide_from_right" }} component={EtapaInformacoes} />
            <FluxoCriarProduto.Screen name="imagens" options={{ animation: "slide_from_right" }} component={EtapaImagens} />
        </FluxoCriarProduto.Navigator>
    );
}