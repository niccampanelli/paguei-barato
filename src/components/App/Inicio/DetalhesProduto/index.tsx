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
import LevantamentoPrecos, { DadoLevantamentoPrecos } from "./LevantamentoPrecos";
import dummyimagem from "./dummyimagem.json";
import estilos from "./styles";

export default function DetalhesProduto() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const sair = () => {
        modalRef.current?.close();
        navigation.getParent()?.navigate("login");
    };

    const dummyLevantamento: DadoLevantamentoPrecos = {
        quantidade: 36,
        menor: 2,
        medio: 5,
        maior: 8.60
    }

    const dummydata = [
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutor Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: { uri: dummyimagem.imagem },
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 20505
        },
    ];

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
                <View style={estilos.cabecalho}>
                    <Image style={estilos.itemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                </View>
                <View style={estilos.container}>
                    <View style={estilos.tags}>
                        <View style={estiloGlobal.tagPequenaDestaque}>
                            <Text style={estiloGlobal.tagPequenaDestaqueTexto}>Molhos e Condimentos</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaNormal, { marginLeft: 10 }]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Sugerido há 2h e 10min</Text>
                        </View>
                    </View>
                    <Text style={[estiloGlobal.titulo, estilos.titulo]}>Molho De Tomate Tradicional 450g Melhore</Text>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Detalhes do produto</Text>
                        <View style={estilos.informacao}>
                            <Text style={estilos.informacaoTitulo}>Marca: </Text>
                            <Text style={estilos.informacaoTexto}>Melhore</Text>
                        </View>
                        <View style={estilos.informacao}>
                            <Text style={estilos.informacaoTitulo}>Variação/Cor: </Text>
                            <Text style={estilos.informacaoTexto}>Tradicional</Text>
                        </View>
                        <View style={estilos.informacao}>
                            <Text style={estilos.informacaoTitulo}>Tamanho: </Text>
                            <Text style={estilos.informacaoTexto}>450g</Text>
                        </View>
                        <View style={estilos.informacao}>
                            <Text style={estilos.informacaoTitulo}>Categoria: </Text>
                            <Text style={estilos.informacaoTexto}>Molhos e Condimentos</Text>
                        </View>
                    </View>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Levantamento de preços</Text>
                        <Text style={[estilos.informacaoTexto, estilos.informacao]}>Informações sobre a variação de preços desse produto em todos os mercados.</Text>
                        <LevantamentoPrecos dados={dummyLevantamento} />
                        <Toast icone="clock" texto="Data da última sugestão de preço: 23/07/2022 às 17:53" style={{ marginTop: 20 }} estilo="secundario" />
                    </View>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Onde encontrar esse produto</Text>
                        <ScrollView style={estilos.lista} nestedScrollEnabled={true}>
                            {dummydata.map((elem, i) => (
                                <ItemLista key={i} item={elem} />
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={estilos.listaObservacao}>As informações de estoque podem estar desatualizadas</Text>
                </View>
            </ScrollView>
        </View>
    );
}