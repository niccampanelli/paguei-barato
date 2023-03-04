import { Feather } from "@expo/vector-icons"
import { useEffect, useRef, useState } from "react";
import { Image, ListRenderItemInfo, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Modal from "../../Modal";
import { useEstilos } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";
import Formatador from "../../../util/Formatador";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import AutoComplete from "../../AutoComplete";
import Produto from "../../../interfaces/Produto";
import { useCacheContext } from "../../../util/context/providers/cacheProvider";
import Texto from "../../Texto";

export default function Lista() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const dummydata = [
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê 500g",
            mercado: "Extra",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Coco ÉBomMesmo 1kg",
            mercado: "Dia",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Detergente Neutro Clear LavaMais 250ml",
            mercado: "Nova Estação",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50,
            riscado: false,
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawaharaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            preco: 2.50,
            riscado: false,
        },
    ];

    const produtosTeste = [
        "Sabão Em Pó Lavanda Ipê 500g",
        "Sabão Em Pó Coco ÉBomMesmo 1kg",
        "Detergente Neutro Clear LavaMais 250ml",
        "Sabão Em Pó Lavanda ÉBomMesmo 250g",
        "Molho De Tomate Ketchup Heinz 1kg",
        "Creme Dental Colgate 90g",
        "Ovos Brancos 12 Unidades",
        "Arroz Agulhinha 5kg",
        "Feijão Carioca 1kg",
        "Açúcar Cristal 1kg",
        "Óleo De Soja 1L",
        "Leite Integral 1L",
        "Café Solúvel 500g",
        "Queijo Mussarela 1kg",
        "Manteiga 250g",
        "Pão Francês 1kg",
        "Pão De Forma 1kg",
        "Pão De Hambúrguer 1kg",
        "Pão De Queijo 1kg",
        "Pão De Milho 1kg",
        "Pão De Ló 1kg",
        "Pão De Mel 1kg",
        "Pão De Açúcar 1kg",
        "Pão De Alho 1kg",
        "Pão De Queijo 1kg",
        "Requeijão 1kg",
        "Iogurte Natural 1kg",
        "Maionese 1kg",
        "Mostarda 1kg"
    ];

    const { produtosCache } = useCacheContext();
    const [produtos, setProdutos] = useState<(string | undefined)[]>([]);

    const navigation = useNavigation();
    const { propriedadesTema } = useTemaContext();

    const { notificar } = useNotificacaoToast();

    const modalRef = useRef<RBSheet>(null);
    const [listaScrollEnabled, setListaScrollEnabled] = useState(true);

    const dimensoesTela = useWindowDimensions();
    const [alturaModal, setAlturaModal] = useState(0);
    const [dados, setDados] = useState(dummydata);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        setAlturaModal(dimensoesTela.height * 0.9);
    }, [dimensoesTela]);

    useEffect(() => {
        let valor = 0;
        dados.forEach((item) => {
            valor += item.preco;
        });
        setValorTotal(valor);
    }, [dados]);

    useEffect(() => {
        produtosCache.forEach((item) => {
            setProdutos((produtos) => [...produtos, item.nome]);
        });
    }, [])

    const irParaDetalhes = () => {
        navigation.navigate("detalhesEstoque" as never);
    }

    const removerItem = (index: number) => {
        const novaLista = dados.filter((_, i) => i !== index);
        setDados(novaLista);
        notificar({
            estilo: "normal",
            texto: "Item removido da lista de compras.",
            icone: "trash",
            dispensavel: true,
            possuiBotao: true,
            labelBotao: "Desfazer",
            aoPressionarBotao: () => {
                setDados(dados);
            }
        });
    };

    const ItemLista = ({ item, index }: ListRenderItemInfo<any>) => {

        const desativado = useSharedValue(false);
        const removido = useSharedValue(false);
        const offset = useSharedValue(0);
        const opacidade = useSharedValue(1);

        const OPACIDADE_DEFAULT = useSharedValue(1);

        useAnimatedReaction(() => {
            return desativado.value;
        }, (isDesativado) => {
            OPACIDADE_DEFAULT.value = isDesativado ? 0.5 : 1;
            opacidade.value = withTiming(OPACIDADE_DEFAULT.value, { duration: 200 });
        }, [item.riscado]);

        useEffect(() => {
            desativado.value = item.riscado;
        }, [item.riscado]);

        const gestoPressionar = Gesture.Tap()
            .onBegin(() => {
                opacidade.value = 0.1;
            })
            .onFinalize(() => {
                opacidade.value = OPACIDADE_DEFAULT.value;
            });

        const estiloAnimado = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: withSpring(offset.value, { damping: 5, mass: 0.2 }) }],
                height: withTiming(removido.value === true ? 0 : 50, { duration: 250 }),
                paddingVertical: withTiming(removido.value === true ? 0 : estilos.listaItemConteudo.paddingVertical, { duration: 100 }, () => {
                    if (removido.value === true)
                        runOnJS(removerItem)(index);
                }),
            };
        });

        const estiloOpacidade = useAnimatedStyle(() => {
            return {
                opacity: withTiming(opacidade.value, { duration: 250 }),
            };
        });

        const swipeableRef = useRef<Swipeable>(null);

        const IconeSwipeConcluido = () => {
            return (
                <View style={estilos.listaItemSwipe}>
                    <Feather name={item.riscado === true ? "rotate-ccw" : "check"} size={propriedadesTema.tamanhoTextos.subtitulo} />
                </View>
            );
        };

        const IconeSwipeRemover = () => {
            return (
                <View style={estilos.listaItemSwipe}>
                    <Feather name="trash" size={propriedadesTema.tamanhoTextos.subtitulo} />
                </View>
            );
        };

        return (
            <GestureHandlerRootView>
                <Swipeable
                    ref={swipeableRef}
                    childrenContainerStyle={estilos.listaItem}
                    renderLeftActions={IconeSwipeConcluido}
                    renderRightActions={IconeSwipeRemover}
                    onSwipeableOpen={() => {
                        swipeableRef.current?.close();
                    }}
                    onSwipeableLeftOpen={() => {
                        desativado.value = !desativado.value;
                        item.riscado = !item.riscado;
                    }}
                    onSwipeableRightOpen={() => {
                        removido.value = true;
                    }}
                >
                    <GestureDetector gesture={gestoPressionar}>
                        <Animated.View onTouchEnd={irParaDetalhes} style={[estilos.listaItemConteudo, estiloAnimado, estiloOpacidade]}>
                            <Image style={estilos.listaItemImagem} source={item.imagem} />
                            <View style={estilos.listaItemInfos}>
                                <Texto peso="800ExtraBold" style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Texto>
                                <Texto style={estilos.listaItemMercado} numberOfLines={1}>{item.mercado}</Texto>
                            </View>
                            <Texto peso="700Bold" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.preco)}</Texto>
                        </Animated.View>
                    </GestureDetector>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <View style={estilos.container}>
            <Modal titulo="Adicionar item à lista" refSheet={modalRef} height={alturaModal}>
                <View style={estilos.modalContainer}>
                    <View style={estilos.modalSecao}>
                        <Texto peso="700Bold" style={estiloGlobal.subtitulo}>Selecione o produto</Texto>
                        {/* <View style={estilos.modalBusca}>
                                        <TextInput style={estilos.modalBuscaCampo} placeholderTextColor={propriedadesTema.cores.textoClaro} placeholder="Pesquise um produto..." />
                                        <Feather style={estilos.modalBuscaIcone} name="shopping-bag" />
                                    </View> */}
                        <AutoComplete dados={produtosTeste} onChangeText={() => console.log("asd")} placeholder="Escolha um produto..." icone="shopping-cart" />
                    </View>
                    <View style={estilos.modalSecao}>
                        <Texto peso="700Bold" style={estiloGlobal.subtitulo}>Escolha onde quer comprar</Texto>
                    </View>
                    <FlatList
                        style={estilos.modalLista}
                        data={[{ opcoes: true }, ...dados]}
                        nestedScrollEnabled={true}
                        renderItem={(props: ListRenderItemInfo<any>) => props.item.opcoes === true ?
                            <ScrollView showsHorizontalScrollIndicator={false} nestedScrollEnabled horizontal style={estilos.listaFiltros}>
                                <TouchableOpacity onPress={() => { }} style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
                                    <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>Filtros</Texto>
                                    <Texto peso="800ExtraBold" style={estilos.filtroContador}>2</Texto>
                                </TouchableOpacity>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                                <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                                </View>
                            </ScrollView>
                            :
                            <ItemLista {...props} />
                        }
                        ListHeaderComponent={() =>
                            <View style={estilos.modalSecao}>
                                <Image source={require("../../../../assets/mapa.png")} style={estilos.modalMapa} />
                            </View>
                        }
                        stickyHeaderIndices={[1]}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={() => modalRef.current?.open()}>
                        <Texto style={estiloGlobal.botaoPrincipalGrandeTexto}>Adicionar à lista</Texto>
                        <View style={estilos.modalBotaoAdicionarPreco}>
                            <Texto style={estilos.modalBotaoAdicionarPrecoTexto}>R$ 2,38</Texto>
                            <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="shopping-bag" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={estilos.cabecalho}>
                <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>Lista de compras</Texto>
                <View style={estilos.resumo}>
                    <View style={estiloGlobal.tagPequenaNormal}>
                        <Texto style={estiloGlobal.tagPequenaNormalTexto}>{dados.length} produtos em 5 mercados</Texto>
                    </View>
                    <View style={estiloGlobal.tagPequenaDestaque}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>{Formatador.formatarMoeda(valorTotal)}</Texto>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Extra</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Dia</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Kawahara</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Nova Estação</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Dovale</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                </ScrollView>
            </View>
            <FlatList style={estilos.lista} scrollEnabled={listaScrollEnabled} contentContainerStyle={{ paddingBottom: 60 }} data={dados} renderItem={(props: ListRenderItemInfo<any>) => <ItemLista {...props} />} />
            <View style={estilos.listaFooter}>
                <TouchableOpacity onPress={() => modalRef.current?.open()} style={estilos.adicionarFlutuante}>
                    <Feather name="plus" style={estilos.adicionarFlutuanteIcone} />
                </TouchableOpacity>
                <Texto style={estilos.listaObservacao}>Arraste o item para a direita para marcá-lo como comprado.</Texto>
                <Texto style={estilos.listaObservacao}>Arraste o item para a esquerda para removê-lo.</Texto>
            </View>
        </View>
    );
}