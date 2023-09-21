import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useEstiloGlobal } from "../../../estiloGlobal";
import { useEstilos } from "./styles";
import Carrossel, { CarrosselPlaceholder } from "../../Carrossel";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import Texto from "../../Texto";
import sugestaoServices from "../../../services/sugestaoServices";
import Sugestao from "../../../interfaces/models/Sugestao";
import Logo from "../../Logo";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavegacaoAppRoutesParams } from "../NavegacaoApp";
import Formatador from "../../../util/Formatador";
import { useAuthContext } from "../../../util/context/providers/authProvider";
import obterSaudacao from "../../../util/saudacao";
import { Feather } from "@expo/vector-icons";
import Modal from "../../Modal";
import RBSheet from "react-native-raw-bottom-sheet";
import Botao from "../../Botao";
import CarregandoSkeleton from "../../CarregandoSkeleton";

type InicioProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "inicio">;

export default function Inicio({ navigation, route }: InicioProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema, temaAtivo } = useTemaContext();
    const { usuarioLogado } = useAuthContext();

    const modalRef = useRef<RBSheet>(null);

    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [saudacao, setSaudacao] = useState<string>("");

    const obterSugestoes = async () => {
        setCarregando(true);
        try {
            const resposta = await sugestaoServices.getSugestoes();
            setSugestoes(resposta.data);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        obterSugestoes();
    }, []);

    useEffect(() => {
        setSaudacao(obterSaudacao(usuarioLogado?.nome?.split(" ")[0]) || "");
    }, [usuarioLogado]);

    const irParaCriar = (item: "criarSugestao" | "criarMercado" | "criarProduto") => {
        modalRef?.current?.close();
        setTimeout(() => {
            navigation.getParent()?.navigate(item);
        }, 200);
    }

    return (
        <View style={estilos.main}>
            <Modal titulo="Adicionar novo" refSheet={modalRef} height={300}>
                <View style={estilos.modalAdicionarBotoes}>
                    <Botao
                        tipo="secundario"
                        titulo="Sugestão"
                        icone="tag"
                        onPress={() => irParaCriar("criarSugestao")}
                    />
                    <Botao
                        tipo="secundario"
                        titulo="Estabelecimento"
                        icone="shopping-cart"
                        onPress={() => irParaCriar("criarMercado")}
                    />
                    <Botao
                        tipo="secundario"
                        titulo="Produto"
                        icone="shopping-bag"
                        onPress={() => irParaCriar("criarProduto")}
                    />
                </View>
            </Modal>
            <ScrollView contentContainerStyle={estilos.container}>
                <StatusBar style={temaAtivo === "claro" ? "dark" : "light"} backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
                <View style={estilos.cabecalho}>
                    <Logo style={estilos.logo} />
                    {saudacao ?
                        <Texto peso="800ExtraBold" style={estiloGlobal.subtitulo}>
                            {saudacao}
                        </Texto>
                        :
                        <CarregandoSkeleton width="50%" height={26} />
                    }
                </View>
                <View style={estilos.destaque}>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.destaqueBadge]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Promoções de laticínios</Texto>
                    </View>
                    <Image style={estilos.destaqueImagem} source={{ uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275", height: 150 }} />
                </View>
                {carregando ?
                    <>
                        <CarrosselPlaceholder style={estilos.carrossel} />
                        <CarrosselPlaceholder style={estilos.carrossel} />
                    </>
                    :
                    <>
                        <Carrossel
                            style={estilos.carrossel}
                            onItemPress={item => navigation.getParent()?.navigate("detalhesEstoque", { item })}
                            imagemItem={(item: Sugestao) => { uri: "" }}
                            tituloItem={(item: Sugestao) => Formatador.formatarNomeProduto(item.estoque?.produto)}
                            subtituloItem={(item: Sugestao) => item.estoque?.mercado?.nome || ""}
                            precoItem={(item: Sugestao) => item.preco || 0}
                            titulo="Maiores descontos"
                            dados={sugestoes}
                            carregando={carregando}
                        />
                        <Carrossel
                            style={estilos.carrossel}
                            onItemPress={item => navigation.getParent()?.navigate("detalhesEstoque", { item })}
                            imagemItem={(item: Sugestao) => { uri: "" }}
                            tituloItem={(item: Sugestao) => Formatador.formatarNomeProduto(item.estoque?.produto)}
                            subtituloItem={(item: Sugestao) => item.estoque?.mercado?.nome || ""}
                            precoItem={(item: Sugestao) => item.preco || 0}
                            titulo="Maiores descontos"
                            dados={sugestoes}
                            carregando={carregando}
                        />
                    </>
                }
            </ScrollView>
            <TouchableOpacity style={estilos.adicionarFlutuante} onPress={() => modalRef?.current?.open()}>
                <Feather name="plus" style={estilos.adicionarFlutuanteIcone} />
            </TouchableOpacity>
        </View>
    );
};