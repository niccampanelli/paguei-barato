import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import variaveisEstilo from "../../../variaveisEstilo";
import estiloGlobal from "../../../estiloGlobal";
import estilos from "./styles";
import Carrossel from "../../Carrossel";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetalhesProduto from "./DetalhesProduto";
import DetalhesMercado from "./DetalhesMercado";
import DetalhesEstoque from "./DetalhesEstoque";
import produtoServices from "../../../services/produtoServices";

export default function Inicio() {

    const Stack = createNativeStackNavigator();

    const Principal = () => {

        useEffect(() => {
            
        }, []);

        const dummydata = [
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda Ipê 500g",
                mercado: "Extra Minimercado Doutor Campos Moura",
                preco: 2.50,
                desconto: 10
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Coco ÉBomMesmo 1kg",
                mercado: "Dia",
                preco: 136500.99
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Detergente Neutro Clear LavaMais 250ml",
                mercado: "Nova Estação",
                preco: 2.50,
                desconto: 45
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50,
                desconto: 15
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawahara",
                preco: 2.50
            },
            {
                imagem: { uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" },
                nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g",
                mercado: "Kawaharaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                preco: 2.50
            },
        ];

        return (
            <View style={estilos.main}>
                <ScrollView contentContainerStyle={estilos.container}>
                    <StatusBar style="dark" backgroundColor={variaveisEstilo.cores.fundoPrincipal} hidden={false} />
                    <View style={estilos.cabecalho}>
                        <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                        <Text style={estiloGlobal.subtitulo}>Boa noite, Nicholas!</Text>
                    </View>
                    <View style={estilos.destaque}>
                        <View style={[estiloGlobal.tagPequenaSecundaria, estilos.destaqueBadge]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Promoções de laticínios</Text>
                        </View>
                        <Image style={estilos.destaqueImagem} source={{ uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275", height: 150 }} />
                    </View>
                    <Carrossel style={estilos.carrossel} titulo="Maiores descontos" dados={dummydata} />
                    <Carrossel style={estilos.carrossel} titulo="Maiores descontos" dados={dummydata} />
                    <Carrossel style={estilos.carrossel} titulo="Maiores descontos" dados={dummydata} />
                </ScrollView>
            </View>
        );
    };

    return (
        <Stack.Navigator initialRouteName="principal" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: variaveisEstilo.cores.fundoPrincipal } }}>
            <Stack.Screen name="principal" component={Principal} />
        </Stack.Navigator>
    );
}