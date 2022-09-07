import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Modal from "../../../Modal";
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

    const ItemLista = ({ item }: any) => {

        return (
            <TouchableOpacity style={estilos.listaItem} onPress={() => navigation.navigate('detalhesEstoque' as never)}>
                <Image style={estilos.listaItemImagem} source={item.imagem} />
                <View style={estilos.listaItemInfos}>
                    <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
                    <Text style={estilos.listaItemMercado} numberOfLines={1}>{item.endereco}</Text>
                </View>
                <Text style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.preco)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={estilos.main}>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" />
                <Text style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={estilos.container}>
                    <Text style={estilos.preco}>R$ 2,38</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('detalhesProduto' as never)}>
                        <Text style={estilos.titulo}>Molho De Tomate Tradicional 450g Melhore <Feather name="arrow-right" style={estilos.tituloIcone} /></Text>
                    </TouchableOpacity>
                    <View style={estilos.secao}>
                        <View style={estilos.informacao}>
                            <Text style={estilos.informacaoTitulo}>Vendido por: </Text>
                        </View>
                        <TouchableOpacity style={estilos.listaItem} onPress={() => navigation.navigate('detalhesMercado' as never)}>
                            <Image style={estilos.listaItemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                            <View style={estilos.listaItemInfos}>
                                <Text style={estilos.listaItemTexto} numberOfLines={1}>Minimercado Extra Artur Alvim</Text>
                                <Text style={estilos.listaItemMercado} numberOfLines={1}>Rua Doutor Campos Moura, 94</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={estilos.secaoBotao}>
                        <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={() => navigation.navigate('lista' as never)}>
                            <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Adicionar à lista</Text>
                            <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="shopping-bag"/>
                        </TouchableOpacity>
                    </View>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Histórico de preços</Text>
                        <Text style={[estilos.informacaoTexto, estilos.informacao]}>Sugestões de preços desse produto desde seu cadastro.</Text>
                        <HistoricoPrecos dados={dummyLevantamento} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}