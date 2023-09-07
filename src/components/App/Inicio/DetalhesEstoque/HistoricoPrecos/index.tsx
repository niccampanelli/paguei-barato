import { useEffect, useRef, useState } from "react";
import { View, ViewProps, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEstiloGlobal } from "../../../../../estiloGlobal";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";
import Formatador from "../../../../../util/Formatador";
import Texto from "../../../../Texto";
import { useEstilos } from "./styles";
import Sugestao from "../../../../../interfaces/models/Sugestao";
import CarregandoSkeleton from "../../../../CarregandoSkeleton";
import { Skeleton } from "moti/skeleton";

interface RetornoEstiloPreco {
    barra: string,
    tag: object,
    tagTexto: object
}

interface HistoricoPrecosProps extends ViewProps {
    dados: Sugestao[]
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

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        let valores = dados.map((dado) => dado.preco!);
        setMaiorValor(Math.max(...valores));

        let datas = dados.map((dado) => new Date(dado.timestamp!)?.getTime());

        setMaiorData(Math.max(...datas));
        setMenorData(Math.min(...datas));
    }, []);

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
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>
                    {dados.length} {dados.length === 1 ? "sugestão de preço" : "sugestões"} {dados.length !== 1 && `em ${Formatador.formatarPeriodoData(new Date(menorData), true, new Date(maiorData))}`}
                </Texto>
            </View>
            <ScrollView nestedScrollEnabled onContentSizeChange={() => { scrollViewRef.current?.scrollToEnd({ animated: false }) }} ref={scrollViewRef} horizontal style={estilos.scroll} contentContainerStyle={estilos.conteudo}>
                {dados ?
                    dados.map((dado, indice) => {

                        const valorAltura = useSharedValue(0);

                        const alturaBarraEstilo = useAnimatedStyle(() => {
                            valorAltura.value = (dado.preco! * 1) / maiorValor;

                            return {
                                flex: withTiming(valorAltura.value, { duration: 800 })
                            };
                        });

                        return (
                            <View key={indice} style={estilos.coluna}>
                                <View style={[obterEstiloPreco(dado.preco!).tag, estilos.tagPreco]}>
                                    <Texto peso="700Bold" style={obterEstiloPreco(dado.preco!).tagTexto}>{Formatador.formatarMoeda(dado.preco!)}</Texto>
                                </View>
                                <Animated.View style={[estilos.barra, { backgroundColor: obterEstiloPreco(dado.preco!).barra }, alturaBarraEstilo]} />
                                <Texto style={estilos.label}>{new Date(dado.timestamp!).toLocaleDateString('pt-BR')}</Texto>
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

export function HistoricoPrecosPlaceholder() {

    const { estilos } = useEstilos();

    const obterAlturaAleatoria = () => {
        return (Math.random() * 0.9) + 0.1;
    };

    const Coluna = () => {
        return (
            <View style={estilos.coluna}>
                <View style={{ marginBottom: 10 }}>
                    <CarregandoSkeleton width={60} height={26} />
                </View>
                <View style={[estilos.barra, { flex: obterAlturaAleatoria() }]}>
                    <CarregandoSkeleton width={"100%"}>
                        <View style={{ height: "100%"}} />
                    </CarregandoSkeleton>
                </View>
                <View style={{ marginTop: 10 }}>
                    <CarregandoSkeleton width={"100%"} height={26} />
                </View>
            </View>
        );
    };

    return (
        <View style={estilos.main}>
            <View style={estilos.quantidade}>
                <CarregandoSkeleton width={150} height={26} />
            </View>
            <View style={[estilos.scroll, estilos.conteudo, { flex: 1 }]}>
                <Skeleton.Group show>
                    <Coluna />
                    <Coluna />
                    <Coluna />
                </Skeleton.Group>
            </View>
        </View>
    );
}