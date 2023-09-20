import { Feather } from "@expo/vector-icons"
import { useEffect, useRef, useState } from "react";
import { Image, ListRenderItemInfo, FlatList, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import { useEstilos } from "./styles";
import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";
import Formatador from "../../../util/Formatador";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import Texto from "../../Texto";
import { useListaContext } from "../../../util/context/providers/listaProvider";
import ItemListaCompras from "../../../interfaces/models/ItemListaCompras";
import Sugestao from "../../../interfaces/models/Sugestao";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavegacaoAppRoutesParams } from "../NavegacaoApp";
import ModalAdicionar from "./ModalAdicionar";
import Mercado from "../../../interfaces/models/Mercado";

type ListaProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "lista">;

interface FiltrosMercados extends Mercado {
    selecionado?: boolean;
}

export default function Lista({ navigation, route }: ListaProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { itensLista, removerItemLista, adicionarItemLista, adicionarSugestaoLista, riscarItemLista } = useListaContext();
    const { propriedadesTema } = useTemaContext();
    const { notificar } = useNotificacaoToast();
    const dimensoesTela = useWindowDimensions();
    const [alturaModal, setAlturaModal] = useState(0);
    const [mercados, setMercados] = useState<FiltrosMercados[]>([]);
    const [valorTotal, setValorTotal] = useState(0);

    const modalRef = useRef<RBSheet>(null);

    useEffect(() => {
        setAlturaModal(dimensoesTela.height * 0.9);
    }, [dimensoesTela]);

    useEffect(() => {
        let valor = 0;
        itensLista.forEach((item) => {
            valor += item.sugestao.preco!;
        });
        setValorTotal(valor);

        let mercadosLista = itensLista.map(item => item.sugestao.estoque?.mercado!);
        let mercadosUnicos = [...new Map(mercadosLista.map(mercado => [mercado['id'], mercado])).values()];
        mercadosUnicos = mercadosUnicos.map(mercado => ({ ...mercado, selecionado: true }));
        setMercados(mercadosUnicos);
    }, [itensLista.length]);

    const obterTextoQuantidade = () => {
        if (itensLista.length === 0)
            return "Nenhum produto na lista";

        var texto = "";

        if (itensLista.length === 1)
            texto = "1 produto"
        else
            texto = `${itensLista.length} produtos`;

        return texto + ` em ${mercados.length} ${mercados.length === 1 ? 'mercado' : 'mercados'}`;
    };

    const irParaDetalhes = (item: Sugestao) => {
        navigation.getParent()?.navigate("detalhesEstoque", { item });
    };

    const selecionarFiltroMercado = (index: number) => {
        let mercadosAtualizados = [...mercados];
        mercadosAtualizados[index].selecionado = !mercadosAtualizados[index].selecionado;
        setMercados(mercadosAtualizados);
    };

    const ItemLista = ({ item }: ListRenderItemInfo<ItemListaCompras>) => {

        const desativado = useSharedValue(false);
        const removido = useSharedValue(false);
        const offset = useSharedValue(0);
        const opacidade = useSharedValue(1);

        const OPACIDADE_DEFAULT = useSharedValue(1);

        const removerItem = (item: ItemListaCompras) => {
            removerItemLista(item);
            setTimeout(() => {
                notificar({
                    estilo: "normal",
                    texto: "Item removido da lista de compras.",
                    icone: "trash",
                    dispensavel: true,
                    autoDispensar: true,
                    possuiBotao: true,
                    labelBotao: "Desfazer",
                    aoPressionarBotao: () => {
                        adicionarItemLista(item);
                    }
                });
            }, 10);
        };

        useAnimatedReaction(() => {
            return desativado.value;
        }, (isDesativado) => {
            OPACIDADE_DEFAULT.value = isDesativado ? 0.3 : 1;
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
                scaleY: withTiming(removido.value === true ? 0 : 1, { duration: 250 }),
                height: withTiming(removido.value === true ? 0 : 50, { duration: 250 }),
                paddingVertical: withTiming(removido.value === true ? 0 : estilos.listaItemConteudo.paddingVertical, { duration: 100 }, () => {
                    if (removido.value === true)
                        runOnJS(removerItem)(item);
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
            <Swipeable
                ref={swipeableRef}
                childrenContainerStyle={estilos.listaItem}
                renderLeftActions={IconeSwipeConcluido}
                renderRightActions={IconeSwipeRemover}
                onSwipeableOpen={(dir) => {
                    swipeableRef.current?.close();
                    if (dir === "left") {
                        desativado.value = !desativado.value;
                        riscarItemLista(item);
                    }
                    else {
                        removido.value = true;
                    }
                }}
            >
                <GestureDetector gesture={gestoPressionar}>
                    <Animated.View onTouchEnd={() => irParaDetalhes(item.sugestao)} style={[estilos.listaItemConteudo, estiloAnimado, estiloOpacidade]}>
                        <View style={estilos.listaItemImagemContainer}>
                            <Image style={estilos.listaItemImagem} source={require("../../../../assets/favicon.png")} />
                        </View>
                        <View style={estilos.listaItemInfos}>
                            <Texto peso="800ExtraBold" style={estilos.listaItemTexto} numberOfLines={1}>
                                {Formatador.formatarNomeProduto(item.sugestao.estoque?.produto)}
                            </Texto>
                            <Texto style={estilos.listaItemMercado} numberOfLines={1}>{item.sugestao.estoque?.mercado?.nome}</Texto>
                        </View>
                        <Texto peso="700Bold" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(item.sugestao.preco!)}</Texto>
                    </Animated.View>
                </GestureDetector>
            </Swipeable>
        );
    };

    const renderizarItemLista = (props: ListRenderItemInfo<ItemListaCompras>) => (<ItemLista key={props.item.sugestao.id} {...props} />);

    return (
        <View style={estilos.container}>
            <ModalAdicionar adicionarSugestao={(item) => { adicionarSugestaoLista(item); modalRef.current?.close() }} alturaModal={alturaModal} forwardRef={modalRef} />
            <View>
                <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>Lista de compras</Texto>
                <View style={estilos.resumo}>
                    <View style={estiloGlobal.tagPequenaNormal}>
                        <Texto style={estiloGlobal.tagPequenaNormalTexto}>
                            {obterTextoQuantidade()}
                        </Texto>
                    </View>
                    <View style={estiloGlobal.tagPequenaDestaque}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>{Formatador.formatarMoeda(valorTotal)}</Texto>
                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={estilos.listaFiltros}
                    contentContainerStyle={estilos.listaFiltrosContainer}
                    data={mercados}
                    renderItem={(item) =>
                        <TouchableOpacity onPress={() => selecionarFiltroMercado(item.index)} style={item.item.selecionado ? estiloGlobal.tagPequenaSecundaria : estiloGlobal.tagPequenaNormal}>
                            <Texto peso={item.item.selecionado ? "700Bold" : "400Regular"} style={item.item.selecionado ? estiloGlobal.tagPequenaSecundariaTexto : estiloGlobal.tagPequenaNormalTexto}>
                                {item.item.nome}
                            </Texto>
                        </TouchableOpacity>
                    }
                />
            </View>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList
                    style={estilos.lista}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={
                        itensLista.filter(item => {
                            let mercado = item.sugestao.estoque?.mercado;
                            if (mercado === undefined)
                                return false;
                            return mercados.find(m => m.id === mercado?.id)?.selecionado === true;
                        })
                    }
                    renderItem={renderizarItemLista}
                    ListEmptyComponent={<Texto peso="800ExtraBold">Nenhum item na lista de compras.</Texto>}
                />
            </GestureHandlerRootView>
            <View style={estilos.listaFooter}>
                <TouchableOpacity onPress={() => modalRef.current?.open()} style={estilos.adicionarFlutuante}>
                    <Feather name="plus" style={estilos.adicionarFlutuanteIcone} />
                </TouchableOpacity>
                <Texto style={estilos.listaObservacao}>Arraste o item para a direita para marcá-lo como comprado.</Texto>
                <Texto style={estilos.listaObservacao}>Arraste o item para a esquerda para removê-lo.</Texto>
            </View>
        </View >
    );
};