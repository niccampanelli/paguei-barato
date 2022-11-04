import { useNavigation } from "@react-navigation/native";
import { Text, View, ViewProps, TouchableOpacity } from "react-native";
import estiloGlobal from "../../../../../estiloGlobal";
import Formatador from "../../../../../util/Formatador";
import variaveisEstilo from "../../../../../variaveisEstilo";
import estilos from "./styles";

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

    const navigation = useNavigation();

    const navegar = () => {
        navigation.navigate("detalhesEstoque" as never);
    }

    return (
        <View style={estilos.main} {...props}>
            <View style={[estiloGlobal.tagPequenaDestaque, estilos.quantidade]}>
                <Text style={estiloGlobal.tagPequenaDestaqueTexto}>{dados.quantidade} {dados.quantidade === 1 ? "sugestão" : "sugestões"} </Text>
            </View>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Text style={estilos.label}>Menor preco</Text>
                <View style={[estiloGlobal.tagPequenaDestaque, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaDestaqueTexto}>{Formatador.formatarMoeda(dados.menor)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.destaque, flex: (dados.menor * 1) / dados.maior }]} />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Text style={estilos.label}>Preço médio</Text>
                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaSecundariaTexto}>{Formatador.formatarMoeda(dados.medio)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.secundaria, flex: (dados.medio * 1) / dados.maior }]} />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.coluna} onPress={navegar}>
                <Text style={estilos.label}>Maior preco</Text>
                <View style={[estiloGlobal.tagPequenaEscura, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaEscuraTexto}>{Formatador.formatarMoeda(dados.maior)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.fundoTerciario, flex: 1 }]} />
            </TouchableOpacity>
        </View>
    );
}