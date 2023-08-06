import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Sugestao from "../../../../interfaces/models/Sugestao";
import { StackExternaRoutesParams } from "../../../../StackExterna";
import Botao from "../../../Botao";
import Texto from "../../../Texto";
import HistoricoPrecos, { DadoHistoricoPrecos } from "./HistoricoPrecos";
import { useEstilos } from "./styles";
import Formatador from "../../../../util/Formatador";

export interface DetalhesEstoqueParams {
    item: Sugestao
}

type DetalhesEstoqueProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesEstoque">;

export default function DetalhesEstoque({ navigation, route }: DetalhesEstoqueProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const { item } = route.params;

    const dummyLevantamento: DadoHistoricoPrecos[] = [
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
    ]

    return (
        <View style={estilos.main}>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" style={estiloGlobal.tagPequenaNormalTexto} />
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Texto>
            </TouchableOpacity>
            <ScrollView>
                <View style={estilos.cabecalho}>
                    <Image style={estilos.itemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                </View>
                <View style={estilos.container}>
                    <Texto peso="900Black" style={estilos.preco}>
                        {Formatador.formatarMoeda(item.preco)}
                    </Texto>
                    <TouchableOpacity style={estilos.titulo} onPress={() => navigation.navigate("detalhesProduto", { item: item.estoque?.produto || {} })}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>
                            {Formatador.formatarNomeProduto(item.estoque?.produto)}
                            <Feather name="arrow-right" style={estilos.tituloIcone} />
                        </Texto>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.mercadoCard} onPress={() => navigation.navigate("detalhesMercado", { item: item.estoque!.mercado! })} >
                        <Image style={estilos.mercadoCardImagem} source={{ uri: "https://i.pinimg.com/originals/b1/f0/93/b1f093fb7e294260afe1cae34996eb33.jpg" }} />
                        <View>
                            <Texto style={estiloGlobal.texto}>Esse item se encontra em:</Texto>
                            <Texto peso="800ExtraBold" style={estiloGlobal.label} >
                                {item.estoque?.mercado?.nome}
                            </Texto>
                        </View>
                        <Feather style={estilos.mercadoCardIcone} name="arrow-right" />
                    </TouchableOpacity>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Histórico de preços</Texto>
                        <Texto style={estiloGlobal.texto}>Preços registrados desse item desde que foi cadastrado pela primeira vez nesse mercado.</Texto>
                    </View>
                    <HistoricoPrecos dados={dummyLevantamento} />
                </View>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao disabled titulo="Adicionar à lista" subtitulo={Formatador.formatarMoeda(item.preco)} icone="shopping-bag" onPress={() => navigation.navigate("lista" as never)} />
            </View>
        </View>
    );
}