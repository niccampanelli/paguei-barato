import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image,  TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Botao from "../../../Botao";
import Texto from "../../../Texto";
import HistoricoPrecos, { DadoHistoricoPrecos } from "./HistoricoPrecos";
import { useEstilos } from "./styles";

export default function DetalhesEstoque() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const navigation = useNavigation();

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
                    <Texto peso="900Black" style={estilos.preco}>R$ 1,55</Texto>
                    <TouchableOpacity onPress={() => navigation.navigate("detalhesProduto" as never)}>
                        <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>Molho De Tomate Tradicional 450g Melhore <Feather name="arrow-right" style={estilos.tituloIcone} /></Texto>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.mercadoCard} onPress={() => navigation.navigate("detalhesMercado" as never)} >
                        <Image style={estilos.mercadoCardImagem} source={{ uri: "https://i.pinimg.com/originals/b1/f0/93/b1f093fb7e294260afe1cae34996eb33.jpg" }} />
                        <View>
                            <Texto style={estiloGlobal.texto} >Esse item se encontra em:</Texto>
                            <Texto peso="800ExtraBold" style={estiloGlobal.label} >Sonda Supermercados Carrão</Texto>
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
                <Botao disabled titulo="Adicionar à lista" subtitulo="R$1,55" icone="shopping-bag" onPress={() => navigation.navigate("lista" as never)}/>
            </View>
        </View>
    );
}