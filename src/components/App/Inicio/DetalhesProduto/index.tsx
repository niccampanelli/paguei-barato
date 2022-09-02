import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../../estiloGlobal";
import Modal from "../../../Modal";
import Levantamento, { DadoLevantamento } from "./Levantamento";
import estilos from "./styles";

export default function DetalhesProduto() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const sair = () => {
        modalRef.current?.close();
        navigation.getParent()?.navigate("login");
    };

    const dummyLevantamento: DadoLevantamento = {
        menor: 0.50,
        medio: 1.99,
        maior: 3.60
    }

    const dummydata = [
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutor Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Dovale LTDA",
            endereco: "Av. Aldeia Manuel Antônio, 385",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Supermercado Kawahara",
            endereco: "Av. Dr. Pereira Vergueiro, 204",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutro Campos Moura, 2341111111111111111111111111111111111111111111111111",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutro Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutro Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutro Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Minimercado Extra Artur Alvim",
            endereco: "Rua Doutro Campos Moura, 234",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Supermercado Kawahara",
            endereco: "Av. Dr. Pereira Vergueiro, 204",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Supermercado Kawahara",
            endereco: "Av. Dr. Pereira Vergueiro, 204",
            preco: 2.52
        },
        {
            imagem: require("../../../../../assets/favicon.png"),
            nome: "Supermercado Kawahara",
            endereco: "Av. Dr. Pereira Vergueiro, 204",
            preco: 2.52
        },
    ];

    const ItemLista = ({ item }: any) => {

        return (
            <TouchableOpacity style={estilos.listaItem}>
                <Image style={estilos.listaItemImagem} source={item.imagem} />
                <View style={estilos.listaItemInfos}>
                    <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
                    <Text style={estilos.listaItemMercado} numberOfLines={1}>{item.endereco}</Text>
                </View>
                <Text style={estilos.listaItemPreco} numberOfLines={1}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={estilos.main}>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]}>
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
                        <Text style={[estilos.informacaoTexto, estilos.informacao]}>Cálculo de preços com base nas sugestões de preço desde sua data de cadastro</Text>
                        <Levantamento dados={dummyLevantamento} />
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