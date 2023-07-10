import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Toast from "../../../Toast";
import LevantamentoPrecos, { DadoLevantamentoPrecos } from "./LevantamentoPrecos";
import dummyimagem from "./dummyimagem.json";
import { useEstilos } from "./styles";
import Texto from "../../../Texto";
import Produto from "../../../../interfaces/models/Produto";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackExternaRoutesParams } from "../../../../StackExterna";

export interface DetalhesProdutoParams {
    item: Produto
}

type DetalhesProdutoProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesProduto">;

export default function DetalhesProduto({ navigation, route }: DetalhesProdutoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    
    const { item } = route.params;

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
                    <Texto peso="800ExtraBold" style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Texto>
                    <Texto style={estilos.listaItemMercado} numberOfLines={1}>{item.endereco}</Texto>
                </View>
                <Texto peso="700Bold" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.preco)}</Texto>
            </TouchableOpacity>
        );
    };

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
                    <View style={estilos.tags}>
                        <View style={estiloGlobal.tagPequenaDestaque}>
                            <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>
                                {item.categoria?.nome}
                            </Texto>
                        </View>
                        <View style={[estiloGlobal.tagPequenaNormal, { marginLeft: 10 }]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Sugerido há 2h e 10min</Texto>
                        </View>
                    </View>
                    <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>
                        {Formatador.formatarNomeProduto(item)}
                    </Texto>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Detalhes do produto</Texto>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Marca: </Texto>
                            <Texto style={estilos.informacaoTexto}>{item.marca || "Sem marca"}</Texto>
                        </View>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Variação/Cor: </Texto>
                            <Texto style={estilos.informacaoTexto}>{item.cor || "Não especificado"}</Texto>
                        </View>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Tamanho: </Texto>
                            <Texto style={estilos.informacaoTexto}>{item.tamanho || "Não especificado"}</Texto>
                        </View>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Categoria: </Texto>
                            <Texto style={estilos.informacaoTexto}>{item.categoria?.nome || "Não categorizado"}</Texto>
                        </View>
                    </View>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Levantamento de preços</Texto>
                        <Texto style={[estilos.informacaoTexto, estilos.informacao]}>Informações sobre a variação de preços desse produto em todos os mercados nos quais ele foi cadastrado.</Texto>
                        <LevantamentoPrecos dados={dummyLevantamento} />
                        <Toast icone="clock" texto="Data da última sugestão de preço: 23/07/2022 às 17:53" style={{ marginTop: 20 }} estilo="normal" />
                    </View>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Onde encontrar esse produto</Texto>
                        <ScrollView style={estilos.lista} nestedScrollEnabled={true}>
                            {dummydata.map((elem, i) => (
                                <ItemLista key={i} item={elem} />
                            ))}
                        </ScrollView>
                    </View>
                    <Texto style={estilos.listaObservacao}>As informações de estoque podem estar desatualizadas</Texto>
                </View>
            </ScrollView>
        </View>
    );
}