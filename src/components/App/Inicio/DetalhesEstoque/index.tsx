import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Toast from "../../../Toast";
import HistoricoPrecos, { DadoHistoricoPrecos } from "./HistoricoPrecos";
import estilos from "./styles";

export default function DetalhesEstoque() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const sair = () => {
        modalRef.current?.close();
        navigation.getParent()?.navigate("login");
    };

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
                <Text style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={estilos.cabecalho}>
                    <Image style={estilos.itemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                </View>
                <View style={estilos.container}>
                    <Text style={estilos.preco}>R$ 1,55</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("detalhesProduto" as never)}>
                        <Text style={[estiloGlobal.titulo, estilos.titulo]}>Molho De Tomate Tradicional 450g Melhore <Feather name="arrow-right" style={estilos.tituloIcone} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.mercadoCard} onPress={() => navigation.navigate("detalhesMercado" as never)} >
                        <Image style={estilos.mercadoCardImagem} source={{ uri: "https://i.pinimg.com/originals/b1/f0/93/b1f093fb7e294260afe1cae34996eb33.jpg" }} />
                        <View>
                            <Text style={estiloGlobal.texto} >Esse item se encontra em:</Text>
                            <Text style={estiloGlobal.label} >Sonda Supermercados Carrão</Text>
                        </View>
                        <Feather style={estilos.mercadoCardIcone} name="arrow-right" />
                    </TouchableOpacity>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Histórico de preços</Text>
                        <Text style={estiloGlobal.texto}>Preços registrados desse item desde que foi cadastrado pela primeira vez nesse mercado.</Text>
                    </View>
                    <HistoricoPrecos dados={dummyLevantamento} />
                </View>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={() => navigation.navigate("lista" as never)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Adicionar à lista</Text>
                    <View style={estilos.botaoAdicionarPreco}>
                        <Text style={estilos.botaoAdicionarPrecoTexto}>R$ 1,55</Text>
                        <Feather name="shopping-bag" style={estiloGlobal.botaoPrincipalGrandeTexto} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}