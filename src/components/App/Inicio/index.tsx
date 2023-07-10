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
import Produto from "../../../interfaces/models/Produto";
import Formatador from "../../../util/Formatador";
import { useAuthContext } from "../../../util/context/providers/authProvider";
import obterSaudacao from "../../../util/saudacao";

type InicioProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "inicio">;

export default function Inicio({ navigation, route }: InicioProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema, temaAtivo } = useTemaContext();
    const { usuarioLogado } = useAuthContext();

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

    return (
        <View style={estilos.main}>
            <ScrollView contentContainerStyle={estilos.container}>
                <StatusBar style={temaAtivo === "claro" ? "dark" : "light"} backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
                <View style={estilos.cabecalho}>
                    <Logo style={estilos.logo} />
                    <Texto peso="800ExtraBold" style={estiloGlobal.subtitulo}>
                        {obterSaudacao(
                            usuarioLogado ? usuarioLogado.nome : "visitante"
                        )}
                    </Texto>
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
                        tituloItem={(item: Sugestao) => Formatador.formatarNomeProduto(item.estoque?.produto)}
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