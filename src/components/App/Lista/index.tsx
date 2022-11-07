import { Feather } from "@expo/vector-icons"
import { useEffect, useRef, useState } from "react";
import { Image, ListRenderItemInfo, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../estiloGlobal";
import Modal from "../../Modal";
import estilos from "./styles";
import { useNavigation } from "@react-navigation/native";
import variaveisEstilo from "../../../variaveisEstilo";
import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";

export default function Lista() {

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

    const navigation = useNavigation();

    const { notificar } = useNotificacaoToast();

    const modalRef = useRef<RBSheet>(null);
    const [listaScrollEnabled, setListaScrollEnabled] = useState(true);

    const dimensoesTela = useWindowDimensions();
    const [alturaModal, setAlturaModal] = useState(0);
    const [dados, setDados] = useState(dummydata);

    useEffect(() => {
        setAlturaModal(dimensoesTela.height * 0.9);
    }, [dimensoesTela]);

    const irParaDetalhes = () => {
        navigation.navigate("detalhesEstoque" as never);
    }

    const removerItem = (index: number) => {
        const novaLista = dados.filter((_, i) => i !== index);
        setDados(novaLista);
        notificar({
            estilo: "normal",
            texto: "Item removido da lista.",
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
                    if(removido.value === true)
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
                    <Feather name={item.riscado === true ? "rotate-ccw" : "check"} size={variaveisEstilo.tamanhoTextos.subtitulo} />
                </View>
            );
        };

        const IconeSwipeRemover = () => {
            return (
                <View style={estilos.listaItemSwipe}>
                    <Feather name="trash" size={variaveisEstilo.tamanhoTextos.subtitulo} />
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
                            <View>
                                <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
                                <Text style={estilos.listaItemMercado} numberOfLines={1}>{item.mercado} - R$ {item.preco}</Text>
                            </View>
                        </Animated.View>
                    </GestureDetector>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <View style={estilos.container}>
            <Modal titulo="Adicionar item à lista" refSheet={modalRef} height={alturaModal}>
                <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={estilos.modalScrollview} contentContainerStyle={estilos.modalScrollContent}>
                    <View style={estilos.modalSecao}>
                        <Text style={estiloGlobal.subtitulo}>Selecione o produto</Text>
                        <View style={estilos.modalBusca}>
                            <TextInput style={estilos.modalBuscaCampo} placeholder="Pesquise um produto..." />
                            <Feather style={estilos.modalBuscaIcone} name="shopping-bag" />
                        </View>
                    </View>
                    <View style={estilos.modalSecao}>
                        <Text style={estiloGlobal.subtitulo}>Escolha onde quer comprar</Text>
                        <Image source={require("../../../../assets/mapa.png")} style={estilos.modalMapa} />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                        <TouchableOpacity onPress={() => { }} style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaDestaqueTexto}>Filtros</Text>
                            <Text style={estilos.filtroContador}>2</Text>
                        </TouchableOpacity>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                        </View>
                    </ScrollView>
                    <FlatList style={estilos.lista} data={dados} renderItem={(props: ListRenderItemInfo<any>) => <ItemLista {...props} />} />
                    <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={() => modalRef.current?.open()}>
                        <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Adicionar à lista</Text>
                        <View style={estilos.modalBotaoAdicionarPreco}>
                            <Text style={estilos.modalBotaoAdicionarPrecoTexto}>R$ 2,38</Text>
                            <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="shopping-bag" />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
            <View style={estilos.cabecalho}>
                <Text style={estiloGlobal.titulo}>Lista de compras</Text>
                <View style={estilos.resumo}>
                    <View style={estiloGlobal.tagPequenaNormal}>
                        <Text style={estiloGlobal.tagPequenaNormalTexto}>{dados.length} produtos em 5 mercados</Text>
                    </View>
                    <View style={estiloGlobal.tagPequenaDestaque}>
                        <Text style={estiloGlobal.tagPequenaDestaqueTexto}>R$ 38,99</Text>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Extra</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Dia</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Kawahara</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Nova Estação</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Dovale</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                </ScrollView>
            </View>
            <FlatList style={estilos.lista} scrollEnabled={listaScrollEnabled} contentContainerStyle={{ paddingBottom: 60 }} data={dados} renderItem={(props: ListRenderItemInfo<any>) => <ItemLista {...props} />} />
            <View style={estilos.listaFooter}>
                <TouchableOpacity onPress={() => modalRef.current?.open()} style={estilos.adicionarFlutuante}>
                    <Feather name="plus" style={estilos.adicionarFlutuanteIcone} />
                </TouchableOpacity>
                <Text style={estilos.listaObservacao}>Arraste o item para a direita para marcá-lo como comprado.</Text>
                <Text style={estilos.listaObservacao}>Arraste o item para a esquerda para removê-lo.</Text>
            </View>
        </View>
    );
}