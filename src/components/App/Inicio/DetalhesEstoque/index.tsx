import { useState, useEffect } from 'react';
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Sugestao from "../../../../interfaces/models/Sugestao";
import { StackExternaRoutesParams } from "../../../../StackExterna";
import Botao from "../../../Botao";
import Texto from "../../../Texto";
import HistoricoPrecos, { HistoricoPrecosPlaceholder } from "./HistoricoPrecos";
import { useEstilos } from "./styles";
import Formatador from "../../../../util/Formatador";
import CarregandoOverlay from '../../../CarregandoOverlay';
import sugestaoServices from '../../../../services/sugestaoServices';
import { useListaContext } from '../../../../util/context/providers/listaProvider';

export interface DetalhesEstoqueParams {
    item: Sugestao
}

type DetalhesEstoqueProps = NativeStackScreenProps<StackExternaRoutesParams, "detalhesEstoque">;

export default function DetalhesEstoque({ navigation, route }: DetalhesEstoqueProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { adicionarSugestaoLista } = useListaContext();

    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    const { item } = route.params;

    const obterSugestoes = async () => {
        setCarregando(true);

        try {
            const { data: sugestoesData } = await sugestaoServices.getSugestoes({
                filtros: {
                    estoqueId: item.estoqueId || 0
                }
            });

            setSugestoes(sugestoesData);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    const adicionarLista = () => {
        adicionarSugestaoLista(item);
        navigation.navigate("app", { screen: 'lista' });
    };

    useEffect(() => {
        obterSugestoes();
    }, [item]);

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
                    <Texto peso="900Black" style={estilos.preco}>
                        {Formatador.formatarMoeda(item.preco || 0)}
                    </Texto>
                    <TouchableOpacity style={estilos.titulo} onPress={() => navigation.navigate("detalhesProduto", { item: item.estoque?.produto || {} })}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>
                            {Formatador.formatarNomeProduto(item.estoque?.produto)}
                            <View style={estilos.tituloIconeContainer}>
                                <Feather name="arrow-right" style={estilos.tituloIcone} />
                            </View>
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
                    {carregando ?
                        <HistoricoPrecosPlaceholder />
                        :
                        <HistoricoPrecos dados={sugestoes} />
                    }
                </View>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao titulo="Adicionar à lista" subtitulo={Formatador.formatarMoeda(item.preco || 0)} icone="shopping-bag" onPress={adicionarLista} />
            </View>
        </View>
    );
}