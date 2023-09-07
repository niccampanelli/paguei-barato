import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Toast from "../../../Toast";
import LevantamentoPrecos, { LevantamentoPrecosPlaceholder } from "./LevantamentoPrecos";
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
import LevantamentoProduto from "../../../../interfaces/models/LevantamentoProduto";
import CarregandoSkeleton from "../../../CarregandoSkeleton";
import { Skeleton } from "moti/skeleton";

export interface DetalhesProdutoParams {
    item: Produto
}

type DetalhesProdutoProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesProduto">;

export default function DetalhesProduto({ navigation, route }: DetalhesProdutoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [levantamento, setLevantamento] = useState<LevantamentoProduto>();
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [sugestoesCarregando, setSugestoesCarregando] = useState<boolean>(false);
    const [levantamentoCarregando, setLevantamentoCarregando] = useState<boolean>(false);

    const { item } = route.params;

    const obterSugestoes = async () => {
        setSugestoesCarregando(true);

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
            setSugestoesCarregando(false);
        }
    };

    const obterLevantamento = async () => {
        setLevantamentoCarregando(true);

        try {
            const { data: levantamento } = await produtoServices.obterLevantamento(item.id!);
            setLevantamento(levantamento);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setLevantamentoCarregando(false);
        }
    };

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

    const ItemListaPlaceholder = () => {

        return (
            <View style={[estilos.listaItem, { alignItems: "flex-start" }]}>
                <CarregandoSkeleton width={50} height={50} />
                <View style={[estilos.listaItemInfos, { gap: 10, marginLeft: 8 }]}>
                    <CarregandoSkeleton width={100} height={16} />
                    <CarregandoSkeleton width={200} height={16} />
                </View>
                <CarregandoSkeleton width={50} height={16} />
            </View>
        );
    };

    useEffect(() => {
        obterSugestoes();
        obterLevantamento();
    }, []);

    return (
        <View style={estilos.main}>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" style={estiloGlobal.tagPequenaNormalTexto} />
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Texto>
            </TouchableOpacity>
            <ScrollView>
                <View style={estilos.cabecalho}>
                    <View style={estilos.imagem}>
                        <Image style={estilos.itemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                    </View>
                </View>
                <View style={estilos.container}>
                    <View style={estilos.tags}>
                        <View style={estiloGlobal.tagPequenaDestaque}>
                            <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>
                                {item.categoria?.nome}
                            </Texto>
                        </View>
                        {!levantamentoCarregando && levantamento ?
                            <View style={[estiloGlobal.tagPequenaNormal, { marginLeft: 10 }]}>
                                <Texto style={estiloGlobal.tagPequenaNormalTexto}>Sugerido há {Formatador.formatarPeriodoData(new Date(levantamento.dataUltimaSugestao))}</Texto>
                            </View>
                            :
                            <View style={{ marginLeft: 10 }}>
                                <CarregandoSkeleton width={120} height={26} />
                            </View>
                        }
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
                        {!levantamentoCarregando && levantamento ?
                            <>
                                <LevantamentoPrecos dados={levantamento} />
                                <Toast icone="clock" texto={`Data da última sugestão: ${Formatador.formatarDataHora(new Date(levantamento.dataUltimaSugestao))}`} style={{ marginTop: 16 }} estilo="normal" />
                            </>
                            :
                            <>
                                <LevantamentoPrecosPlaceholder />
                                <View style={{ marginTop: 16 }}>
                                    <CarregandoSkeleton width={"100%"} height={60} />
                                </View>
                            </>
                        }
                    </View>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Onde encontrar esse produto</Texto>
                        <View style={estilos.lista}>
                            {!sugestoesCarregando && sugestoes ?
                                sugestoes.map((elem, i) => (
                                    <ItemLista key={i} item={elem} />
                                ))
                                :
                                <Skeleton.Group show>
                                    <ItemListaPlaceholder />
                                    <ItemListaPlaceholder />
                                    <ItemListaPlaceholder />
                                </Skeleton.Group>
                            }
                        </View>
                    </View>
                    <Texto style={estilos.listaObservacao}>As informações de estoque podem estar desatualizadas</Texto>
                </View>
            </ScrollView>
        </View>
    );
}