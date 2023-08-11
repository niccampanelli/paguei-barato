import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
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
import sugestaoServices from "../../../../services/sugestaoServices";
import produtoServices from "../../../../services/produtoServices";
import Mercado from "../../../../interfaces/models/Mercado";
import CarregandoOverlay from "../../../CarregandoOverlay";
import Sugestao from "../../../../interfaces/models/Sugestao";
import estoqueServices from "../../../../services/estoqueServices";

export interface DetalhesProdutoParams {
    item: Produto
}

type DetalhesProdutoProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesProduto">;

export default function DetalhesProduto({ navigation, route }: DetalhesProdutoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [dataUltimaSugestao, setDataUltimaSugestao] = useState<Date>(new Date());
    const [carregando, setCarregando] = useState<boolean>(false);

    const { item } = route.params;

    const obterSugestoes = async () => {
        setCarregando(true);

        try {
            const { data: mercados } = await produtoServices.listarMercados(item.id || 0);

            for (const mercado of mercados) {
                const { data: estoqueData } = await estoqueServices.getEstoques({
                    filtros: {
                        mercadoId: mercado.id || 0,
                        produtoId: item.id || 0
                    }
                });

                const estoque = estoqueData[0];

                if (estoque) {
                    const { data: sugestaoData } = await sugestaoServices.getSugestoes({
                        filtros: {
                            estoqueId: estoque.id || 0
                        },
                        ordenado: {
                            ordenarPor: "timestamp",
                            ordem: "desc"
                        }
                    });

                    setSugestoes((sugestao) => [...sugestao, sugestaoData[0]]);
                }
            };
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    const obterDataUltimaSugestao = () => {
        let data = new Date().getTime();

        for (const sugestao of sugestoes) {
            const dataSugestaoTime = new Date(sugestao.timestamp || '').getTime();
            if (dataSugestaoTime < data)
                data = dataSugestaoTime;
        }

        return new Date(data);
    };

    const dummyLevantamento: DadoLevantamentoPrecos = {
        quantidade: 36,
        menor: 2,
        medio: 5,
        maior: 8.60
    }

    const ItemLista = ({ item }: { item: Sugestao }) => {

        return (
            <TouchableOpacity style={estilos.listaItem} onPress={() => navigation.navigate('detalhesEstoque', { item })}>
                <View style={estilos.listaItemImagemContainer}>
                    <Image style={estilos.listaItemImagem} source={{ uri: dummyimagem.imagem }} />
                </View>
                <View style={estilos.listaItemInfos}>
                    <Texto peso="800ExtraBold" style={estilos.listaItemTexto} numberOfLines={1}>{item.estoque?.mercado?.nome}</Texto>
                    <Texto style={estilos.listaItemMercado} numberOfLines={1}>{item.estoque?.mercado?.logradouro}, {item.estoque?.mercado?.numero}</Texto>
                </View>
                <Texto peso="700Bold" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.preco || 0)}</Texto>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        obterSugestoes();
    }, []);

    useEffect(() => {
        if (sugestoes.length > 0)
            setDataUltimaSugestao(obterDataUltimaSugestao());
    }, [sugestoes]);

    return (
        <View style={estilos.main}>
            {carregando &&
                <CarregandoOverlay />
            }
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
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Sugerido há {Formatador.formatarPeriodoData(dataUltimaSugestao)}.</Texto>
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
                        <Toast icone="clock" texto={`Data da última sugestão: ${Formatador.formatarDataHora(dataUltimaSugestao)}`} style={{ marginTop: 20 }} estilo="normal" />
                    </View>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Onde encontrar esse produto</Texto>
                        <View style={estilos.lista}>
                            {sugestoes.map((elem, i) => (
                                <ItemLista key={i} item={elem} />
                            ))}
                        </View>
                    </View>
                    <Texto style={estilos.listaObservacao}>As informações de estoque podem estar desatualizadas</Texto>
                </View>
            </ScrollView>
        </View>
    );
}