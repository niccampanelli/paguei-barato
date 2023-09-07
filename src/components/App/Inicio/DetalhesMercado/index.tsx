import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ViewProps, ScrollView } from "react-native";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Texto from "../../../Texto";
import { useEstilos } from "./styles";
import Mercado from "../../../../interfaces/models/Mercado";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackExternaRoutesParams } from "../../../../StackExterna";
import Sugestao from "../../../../interfaces/models/Sugestao";
import mercadoServices from "../../../../services/mercadoServices";
import estoqueServices from "../../../../services/estoqueServices";
import sugestaoServices from "../../../../services/sugestaoServices";
import CarregandoOverlay from "../../../CarregandoOverlay";
import CarregandoSkeleton from "../../../CarregandoSkeleton";
import { Skeleton } from "moti/skeleton";

interface SugestaoProp extends ViewProps {
    item: Sugestao,
}

export interface DetalhesMercadoParams {
    item: Mercado
}

type DetalhesMercadoProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesMercado">;

export default function DetalhesMercado({ navigation, route }: DetalhesMercadoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [sugestoesCarregando, setSugestoesCarregando] = useState<boolean>(false);

    const { item } = route.params;

    const obterSugestoes = async () => {
        setSugestoesCarregando(true);

        try {
            const { data: produtos } = await mercadoServices.listarProdutos(item.id || 0);

            let sugestoesTemp: Sugestao[] = [];

            for await (const produto of produtos) {
                const { data: estoqueData } = await estoqueServices.getEstoques({
                    filtros: {
                        mercadoId: item.id || 0,
                        produtoId: produto.id || 0
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

                    sugestoesTemp.push(sugestaoData[0]);
                }
            };

            setSugestoes(sugestoesTemp);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setSugestoesCarregando(false);
        }
    };

    useEffect(() => {
        obterSugestoes();
    }, []);

    const ItemLista = ({ item, ...props }: SugestaoProp) => {

        return (
            <TouchableOpacity {...props} style={[estilos.listaItem, props.style]} onPress={() => navigation.navigate('detalhesEstoque', { item })}>
                <Image style={estilos.listaItemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                <View style={estilos.listaItemInfos}>
                    <Texto peso="900Black" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.preco!)}</Texto>
                    <Texto peso="800ExtraBold" style={estilos.listaItemTexto}>{item.estoque?.produto?.nome}</Texto>
                </View>
            </TouchableOpacity>
        );
    };

    const ItemListaPlaceholder = (props: ViewProps) => {

        return (
            <View style={[estilos.listaItem, props.style]}>
                <CarregandoSkeleton width={"100%"} height={160} />
                <View style={{ height: 10 }} />
                <CarregandoSkeleton width={"50%"} height={26} />
                <View style={{ height: 8 }} />
                <CarregandoSkeleton width={"80%"} height={16} />
                <View style={{ height: 10 }} />
            </View>
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
                    <View style={estilos.imagem}>
                        <Image style={estilos.itemImagem} source={{ uri: "data:image/jpeg;base64,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" }} />
                    </View>
                </View>
                <View style={estilos.container}>
                    <View style={estilos.tags}>
                        <View style={estiloGlobal.tagPequenaDestaque}>
                            <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>
                                {item.ramo?.nome}
                            </Texto>
                        </View>
                    </View>
                    <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>
                        {item.nome}
                    </Texto>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Informações do mercado</Texto>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Ramo: </Texto>
                            <Texto style={estilos.informacaoTexto}>{item.ramo?.nome || "Não categorizado"}</Texto>
                        </View>
                        <View style={estilos.informacao}>
                            <Texto peso="700Bold" style={estilos.informacaoTitulo}>Localização: </Texto>
                        </View>
                        <View style={estilos.informacao}>
                            <Texto style={estilos.informacaoTexto}>{Formatador.formatarEnderecoMercado(item)}</Texto>
                        </View>
                        <ScrollView nestedScrollEnabled style={{ height: 400, width: "100%", flex: 1, borderRadius: 50 }}>
                            <ScrollView nestedScrollEnabled horizontal style={{ flex: 1, borderRadius: 20 }}>
                                <Image source={require("../../../../../assets/mapa.png")} />
                            </ScrollView>
                        </ScrollView>
                    </View>
                    <View style={estilos.secao}>
                        <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Nas prateleiras desse mercado</Texto>
                        <ScrollView scrollEnabled={!sugestoesCarregando} style={estilos.lista} contentContainerStyle={estilos.listaConteudo} nestedScrollEnabled>
                            {sugestoesCarregando ?
                                <>
                                    <ItemListaPlaceholder style={{ marginRight: "1%" }} />
                                    <ItemListaPlaceholder style={{ marginLeft: "1%" }} />
                                    <ItemListaPlaceholder style={{ marginRight: "1%" }} />
                                    <ItemListaPlaceholder style={{ marginLeft: "1%" }} />
                                </>
                                :
                                sugestoes.map((sugestao, i) => (
                                    <ItemLista key={i} item={sugestao} style={(i % 2 === 0) ? { marginRight: "1%" } : { marginLeft: "1%" }} />
                                ))}
                        </ScrollView>
                    </View>
                    <Texto style={estilos.listaObservacao}>As informações de estoque podem estar desatualizadas</Texto>
                </View>
            </ScrollView>
        </View>
    );
}