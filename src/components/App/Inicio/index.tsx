import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, View } from "react-native";
import { useEstiloGlobal } from "../../../estiloGlobal";
import { useEstilos } from "./styles";
import Carrossel from "../../Carrossel";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import Texto from "../../Texto";
import sugestaoServices from "../../../services/sugestaoServices";
import Sugestao from "../../../interfaces/models/Sugestao";
import Logo from "../../Logo";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavegacaoAppRoutesParams } from "../NavegacaoApp";

type DetalhesEstoqueProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "inicio">;

export default function Inicio({ navigation, route }: DetalhesEstoqueProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema, temaAtivo } = useTemaContext();

    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

    const obterSugestoes = async () => {
        try {
            const resposta = await sugestaoServices.getSugestoes();
            setSugestoes(resposta.data);
        }
        catch (erro) {
            console.log(erro);
        }
    };

    useEffect(() => {
        obterSugestoes();
    }, []);

    const dummydata = [
        {
            imagem: { uri: "https://medlimp.com.br/wp-content/uploads/2019/04/brilhante-600x600.jpg" },
            nome: "Sabão Em Pó Lavanda Brilhante 500g",
            mercado: "Extra Minimercado Doutor Campos Moura",
            preco: 8.59,
            desconto: 35
        },
        {
            imagem: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hqGUGfTc_nAngJDoaaJnD2InGQSmByet5w&usqp=CAU" },
            nome: "Detergente Cereja Minuano 500ml",
            mercado: "Mercado Dia",
            preco: 2.5
        },
        {
            imagem: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYlerKmzGHHxkJ7MnRVJTbgmg5zyMMyOHkA&usqp=CAU" },
            nome: "Macarrão Espaguete Barilla 500g",
            mercado: "Nova Estação Supermercado Artur Alvim",
            preco: 1.99,
        },
        {
            imagem: { uri: "https://cf.shopee.com.br/file/3f9fd2b49402e9ab641c562a207b7912" },
            nome: "Ração Golden Cães Adultos Raças Pequenas 3kg",
            mercado: "Kawahara Vila Nhocuné",
            preco: 29.99,
            desconto: 15
        },
        {
            imagem: { uri: "https://www.madrid.com.br/imagens/produtos/big/46381.jpg" },
            nome: "Pão Francês Kg",
            mercado: "Padaria e Confeitaria São Paulo",
            preco: 12.99,
        },
        {
            imagem: { uri: "https://images-americanas.b2w.io/produtos/3087069464/imagens/leite-uht-integral-1l-quata/3087069464_1_xlarge.jpg" },
            nome: "Leite UHT Integral Quatá 1L",
            mercado: "Sonda Supermercado Vila Carrão",
            preco: 5.67,
            desconto: 12
        },
        {
            imagem: { uri: "https://images-americanas.b2w.io/produtos/3328249395/imagens/sabonete-em-barra-algas-marinhas-even-suave-envoltorio-85g/3328249395_1_large.jpg" },
            nome: "Sabonete Em Barra Algas Marinhas Even Suave Envoltório 85g",
            mercado: "Lojas Americanas",
            preco: 2.99,
        },
        {
            imagem: { uri: "https://apoioentrega.vteximg.com.br/arquivos/ids/464205/2149.jpg?v=637685996252730000" },
            nome: "Limão Tahiti Kg",
            mercado: "Hortifruti Pão de Açúcar",
            preco: 3.50,
        },
        {
            imagem: { uri: "https://revistacampoenegocios.com.br/wp-content/uploads/2020/05/shutterstock_120016855-1024x913.jpg" },
            nome: "Tomate Kg",
            mercado: "Hortifruti Pão de Açúcar",
            preco: 6.84,
        },
        {
            imagem: { uri: "https://www.efacil.com.br/wcsstore/ExtendedSitesCatalogAssetStore/Imagens/1000/4900659_01.jpg" },
            nome: "Molho de Tomate Quero 350g",
            mercado: "Kawahara",
            preco: 2.50
        },
        {
            imagem: { uri: "https://araujo.vteximg.com.br/arquivos/ids/4174794-1000-1000/07896902212190.jpg?v=637935883244370000" },
            nome: "Soro Fisiológico Kenx 500ml",
            mercado: "Carrefour Vila Mariana",
            preco: 2.99,
        },
        {
            imagem: { uri: "https://images.tcdn.com.br/img/img_prod/666230/margarina_doriana_c_sal_500g_2459_1_20200517153732.jpg" },
            nome: "Margarina Doriana C/ Sal 500g",
            mercado: "Supermercado Estrela Azul Guilhermina Esperança",
            preco: 8.99,
        },
    ];

    return (
        <View style={estilos.main}>
            <ScrollView contentContainerStyle={estilos.container}>
                <StatusBar style={temaAtivo === "claro" ? "dark" : "light"} backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
                <View style={estilos.cabecalho}>
                    <Logo style={estilos.logo} />
                    <Texto peso="800ExtraBold" style={estiloGlobal.subtitulo}>Boa noite, Nicholas!</Texto>
                </View>
                <View style={estilos.destaque}>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.destaqueBadge]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Promoções de laticínios</Texto>
                    </View>
                    <Image style={estilos.destaqueImagem} source={{ uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275", height: 150 }} />
                </View>
                {sugestoes.length > 0 &&
                    <Carrossel
                        style={estilos.carrossel}
                        onItemPress={item => navigation.getParent()?.navigate("detalhesEstoque", { item })}
                        imagemItem={(item: Sugestao) => { uri: "" }}
                        tituloItem={(item: Sugestao) => item.estoque?.produto.nome || ""}
                        subtituloItem={(item: Sugestao) => item.estoque?.mercado?.nome || ""}
                        precoItem={(item: Sugestao) => item.preco || 0}
                        titulo="Maiores descontos"
                        dados={sugestoes}
                    />
                }
            </ScrollView>
        </View>
    );
};