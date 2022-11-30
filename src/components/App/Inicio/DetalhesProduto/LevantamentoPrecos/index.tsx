import { useNavigation } from "@react-navigation/native";
import {  View, ViewProps, TouchableOpacity } from "react-native";
import { useEstiloGlobal } from "../../../../../estiloGlobal";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";
import Formatador from "../../../../../util/Formatador";
import Texto from "../../../../Texto";
import { useEstilos } from "./styles";

export interface DadoLevantamentoPrecos {
    quantidade: number,
    menor: number,
    medio: number,
    maior: number
}

interface LevantamentoPrecosProps extends ViewProps {
    dados: DadoLevantamentoPrecos
}

export default function LevantamentoPrecos({
    dados,
    ...props
}: LevantamentoPrecosProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const navigation = useNavigation();
    const { propriedadesTema } = useTemaContext();

    const navegar = () => {
        navigation.navigate("detalhesEstoque" as never);
    }

    return (
        <View style={estilos.main} {...props}>
            <View style={[estiloGlobal.tagPequenaDestaque, estilos.quantidade]}>
                <Texto style={estiloGlobal.tagPequenaDestaqueTexto}>{dados.quantidade} {dados.quantidade === 1 ? "sugestão" : "sugestões"} </Texto>
            </View>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Texto style={estilos.label}>Menor preco</Texto>
                <View style={[estiloGlobal.tagPequenaDestaque, estilos.tagPreco]}>
                    <Texto style={estiloGlobal.tagPequenaDestaqueTexto}>{Formatador.formatarMoeda(dados.menor)}</Texto>
                </View>
                <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.destaque, flex: (dados.menor * 1) / dados.maior }]} />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Texto style={estilos.label}>Preço médio</Texto>
                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.tagPreco]}>
                    <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>{Formatador.formatarMoeda(dados.medio)}</Texto>
                </View>
                <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.secundaria, flex: (dados.medio * 1) / dados.maior }]} />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Texto style={estilos.label}>Maior preco</Texto>
                <View style={[estiloGlobal.tagPequenaEscura, estilos.tagPreco]}>
                    <Texto style={estiloGlobal.tagPequenaEscuraTexto}>{Formatador.formatarMoeda(dados.maior)}</Texto>
                </View>
                <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.fundoTerciario, flex: 1 }]} />
            </TouchableOpacity>
        </View>
    );
}