import { useEffect, useState } from "react";
import { Text, View, ViewProps, ScrollView } from "react-native";
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import estiloGlobal from "../../../../../estiloGlobal";
import Formatador from "../../../../../util/Formatador";
import variaveisEstilo from "../../../../../variaveisEstilo";
import estilos from "./styles";

export interface DadoHistoricoPrecos {
    data: Date,
    preco: number
}

interface RetornoEstiloPreco {
    barra: string,
    tag: object,
    tagTexto: object
}

interface HistoricoPrecosProps extends ViewProps {
    dados: DadoHistoricoPrecos[]
}

export default function HistoricoPrecos({
    dados,
    ...props
}: HistoricoPrecosProps) {

    const [maiorValor, setMaiorValor] = useState(-0.1);
    const [maiorData, setMaiorData] = useState(0);
    const [menorData, setMenorData] = useState(0);
    const [periodoData, setPeriodoData] = useState(0);

    useEffect(() => {
        let valores = dados.map((dado) => dado.preco);
        setMaiorValor(Math.max(...valores));

        let datas = dados.map((dado) => dado.data.getTime());
        setMaiorData(Math.max(...datas));
        setMenorData(Math.min(...datas));
    }, []);

    useEffect(() => {
        setPeriodoData(maiorData - menorData);
    }, [maiorData, menorData]);

    const obterEstiloPreco = (valor: number): RetornoEstiloPreco => {
        if (!valor)
            return {
                barra: variaveisEstilo.cores.destaque,
                tag: estiloGlobal.tagPequenaDestaque,
                tagTexto: estiloGlobal.tagPequenaDestaqueTexto
            };

        if (valor >= (maiorValor / 3)) {
            if (valor >= (maiorValor * 2 / 3)) {
                return {
                    barra: variaveisEstilo.cores.fundoTerciario,
                    tag: estiloGlobal.tagPequenaEscura,
                    tagTexto: estiloGlobal.tagPequenaEscuraTexto
                };
            }
            else {
                return {
                    barra: variaveisEstilo.cores.secundaria,
                    tag: estiloGlobal.tagPequenaSecundaria,
                    tagTexto: estiloGlobal.tagPequenaSecundariaTexto
                };
            }
        }
        else {
            return {
                barra: variaveisEstilo.cores.destaque,
                tag: estiloGlobal.tagPequenaDestaque,
                tagTexto: estiloGlobal.tagPequenaDestaqueTexto
            };
        }
    };

    return (
        <View style={estilos.main} {...props}>
            <View style={[estiloGlobal.tagPequenaDestaque, estilos.quantidade]}>
                <Text style={estiloGlobal.tagPequenaDestaqueTexto}>{dados.length} {dados.length === 1 ? "sugestão" : "sugestões"} em {(periodoData / 86400000) / 365} anos</Text>
            </View>
            <ScrollView nestedScrollEnabled horizontal style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
                {dados ?
                    dados.map((dado, indice) => {

                        const valorAltura = useSharedValue(0);

                        const alturaBarraEstilo = useAnimatedStyle(() => {
                            valorAltura.value = (dado.preco * 1) / maiorValor;

                            return {
                                flex: withTiming(valorAltura.value, { duration: 800 })
                            };
                        });

                        return (
                            <View key={indice} style={[estilos.coluna, (indice < dados.length - 1 ? { marginRight: 40 } : undefined)]}>
                                <View style={[obterEstiloPreco(dado.preco).tag, estilos.tagPreco]}>
                                    <Text style={obterEstiloPreco(dado.preco).tagTexto}>{Formatador.formatarMoeda(dado.preco)}</Text>
                                </View>
                                <Animated.View style={[estilos.barra, { backgroundColor: obterEstiloPreco(dado.preco).barra }, alturaBarraEstilo]} />
                                <Text style={estilos.label}>{dado.data.toLocaleDateString('pt-BR')}</Text>
                            </View>
                        );
                    })
                    :
                    null
                }
            </ScrollView>
        </View>
    );
}