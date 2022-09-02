import { Image, Text, TouchableOpacity, View, ViewProps } from "react-native";
import estiloGlobal from "../../../../../estiloGlobal";
import variaveisEstilo from "../../../../../variaveisEstilo";
import estilos from "./styles";

export interface DadoLevantamento {
    menor: number,
    medio: number,
    maior: number
}

interface LevantamentoProps extends ViewProps {
    dados: DadoLevantamento
}

export default function Levantamento({
    dados
}: LevantamentoProps) {

    return (
        <View style={estilos.main}>
            <View style={estilos.coluna}>
                <Text style={estilos.label}>Menor preco</Text>
                <View style={[estiloGlobal.tagPequenaDestaque, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaDestaqueTexto}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.menor)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.destaque, flex: (dados.menor * 1) / dados.maior} ]} />
            </View>
            <View style={estilos.coluna}>
                <Text style={estilos.label}>Preço médio</Text>
                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaSecundariaTexto}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.medio)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.secundaria, flex: (dados.medio * 1) / dados.maior }]} />
            </View>
            <View style={estilos.coluna}>
                <Text style={estilos.label}>Maior preco</Text>
                <View style={[estiloGlobal.tagPequenaEscura, estilos.tagPreco]}>
                    <Text style={estiloGlobal.tagPequenaEscuraTexto}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.maior)}</Text>
                </View>
                <View style={[estilos.barra, { backgroundColor: variaveisEstilo.cores.fundoTerciario, flex: 1 }]} />
            </View>
        </View>
    );
}