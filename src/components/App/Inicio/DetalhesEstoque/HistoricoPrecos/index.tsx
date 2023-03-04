import { useEffect, useRef, useState } from "react";
import {  View, ViewProps, ScrollView } from "react-native";
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useEstiloGlobal } from "../../../../../estiloGlobal";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";
import Formatador from "../../../../../util/Formatador";
import Texto from "../../../../Texto";
import { useEstilos } from "./styles";

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

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const { propriedadesTema } = useTemaContext();

    const [maiorValor, setMaiorValor] = useState(-0.1);
    const [maiorData, setMaiorData] = useState(0);
    const [menorData, setMenorData] = useState(0);
    const [periodoData, setPeriodoData] = useState(0);

    const scrollViewRef = useRef<ScrollView>(null);

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
                barra: propriedadesTema.cores.destaque,
                tag: estiloGlobal.tagPequenaDestaque,
                tagTexto: estiloGlobal.tagPequenaDestaqueTexto
            };

        if (valor >= (maiorValor / 3)) {
            if (valor >= (maiorValor * 2 / 3)) {
                return {
                    barra: propriedadesTema.cores.fundoTerciario,
                    tag: estiloGlobal.tagPequenaEscura,
                    tagTexto: estiloGlobal.tagPequenaEscuraTexto
                };
            }
            else {
                return {
                    barra: propriedadesTema.cores.secundaria,
                    tag: estiloGlobal.tagPequenaSecundaria,
                    tagTexto: estiloGlobal.tagPequenaSecundariaTexto
                };
            }
        }
        else {
            return {
                barra: propriedadesTema.cores.destaque,
                tag: estiloGlobal.tagPequenaDestaque,
                tagTexto: estiloGlobal.tagPequenaDestaqueTexto
            };
        }
    };

    return (
        <View style={estilos.main} {...props}>
            <View style={[estiloGlobal.tagPequenaDestaque, estilos.quantidade]}>
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>{dados.length} {dados.length === 1 ? "sugestão" : "sugestões"} em {Math.round((periodoData / 86400000) / 365)} anos</Texto>
            </View>
            <ScrollView nestedScrollEnabled onContentSizeChange={() => { scrollViewRef.current?.scrollToEnd({ animated: false }) }} ref={scrollViewRef} horizontal style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
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
                                    <Texto peso="700Bold" style={obterEstiloPreco(dado.preco).tagTexto}>{Formatador.formatarMoeda(dado.preco)}</Texto>
                                </View>
                                <Animated.View style={[estilos.barra, { backgroundColor: obterEstiloPreco(dado.preco).barra }, alturaBarraEstilo]} />
                                <Texto style={estilos.label}>{dado.data.toLocaleDateString('pt-BR')}</Texto>
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