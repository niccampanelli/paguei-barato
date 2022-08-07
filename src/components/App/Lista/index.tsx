import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, Image, ListRenderItemInfo, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, GestureStateChangeEvent, PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import estiloGlobal from "../../../estiloGlobal";
import estilos from "./styles";

export default function Lista() {

    const dummydata = [
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê 500g",
            mercado: "Extra",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Coco ÉBomMesmo 1kg",
            mercado: "Dia",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Detergente Neutro Clear LavaMais 250ml",
            mercado: "Nova Estação",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
            mercado: "Kawaharaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            preco: 2.50
        },
    ];

    const ItemLista = ({item}: ListRenderItemInfo<any>) => {
        
        const pressionado = useSharedValue(false);
        const desativado = useSharedValue(false);
        const offset = useSharedValue(0);
        const opacidade = useSharedValue(1);
        
        const gestoArrastar = Gesture.Pan()
            .onBegin(() => {
                pressionado.value = true;
            })
            .onUpdate((e) => {
                if(e.translationX < 100 && e.translationX > -100)
                    offset.value = e.translationX;
            })
            .onEnd(() => {
                if(offset.value > 50){
                    if(desativado.value == true){
                        opacidade.value = 1;
                        desativado.value = false;
                    }
                    else{
                        opacidade.value = .3;
                        desativado.value = true;
                    }
                }
                else if(offset.value < -50){
                    if(desativado.value == true){
                        opacidade.value = 1;
                        desativado.value = false;
                    }
                    else{
                        opacidade.value = 0;
                        desativado.value = true;
                    }
                }
                offset.value = 0;
                pressionado.value = false;
            });

        const gestoPressionar = Gesture.Tap()
            .onBegin(() => {
                opacidade.value = 0.1;
            })
            .onFinalize(() => {
                if(desativado.value === true)
                    opacidade.value = withTiming(0.3, { duration: 200 });
                else
                    opacidade.value = withTiming(1, { duration: 200 });
            });

        const gestoComposto = Gesture.Exclusive(gestoArrastar, gestoPressionar);

        const estiloAnimado = useAnimatedStyle(() => {

            return {
                transform: [{ translateX: withSpring(offset.value, {damping: 5, mass: 0.2}) }],
                opacity: opacidade.value
            };
        });

        return (
            <GestureHandlerRootView>
            <GestureDetector gesture={gestoComposto}>
            <Animated.View style={[estilos.listaItem, estiloAnimado]}>
                <Image style={estilos.listaItemImagem} source={item.imagem}/>
                <View>
                    <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
                    <Text style={estilos.listaItemMercado} numberOfLines={1}>{item.mercado} - R$ {item.preco}</Text>
                </View>
            </Animated.View>
            </GestureDetector>
            </GestureHandlerRootView>
        );
    };
    
    return (
        <View style={estilos.container}>
            <View style={estilos.cabecalho}>
                <Text style={estiloGlobal.titulo}>Lista de compras</Text>
                <View style={estilos.resumo}>
                    <View style={estiloGlobal.tagPequenaNormal}>
                        <Text style={estiloGlobal.tagPequenaNormalTexto}>2 produtos em 5 mercados</Text>
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
            <FlatList style={estilos.lista} contentContainerStyle={{ paddingBottom: 60 }} data={dummydata} renderItem={(props: ListRenderItemInfo<any>) => <ItemLista {...props}/>}/>
            <View style={estilos.listaFooter}>
                <TouchableOpacity style={estilos.adicionarFlutuante}>
                    <Feather name="plus" style={estilos.adicionarFlutuanteIcone}/>
                </TouchableOpacity>
                <Text style={estilos.listaObservacao}>Arraste o item para a direita para marcá-lo como comprado.</Text>
                <Text style={estilos.listaObservacao}>Arraste o item para a esquerda para removê-lo.</Text>
            </View>
        </View>
    );
}