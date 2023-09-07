import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItemInfo, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Modal from "../../Modal";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import { useEstilos } from "./styles";
import Texto from "../../Texto";
import Input from "../../Input";
import produtoServices from "../../../services/produtoServices";
import Produto from "../../../interfaces/models/Produto";
import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavegacaoAppRoutesParams } from "../NavegacaoApp";
import CarregandoOverlay from "../../CarregandoOverlay";
import Mercado from "../../../interfaces/models/Mercado";
import mercadoServices from "../../../services/mercadoServices";
import Formatador from "../../../util/Formatador";

type BuscaProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "buscar">;

export default function Busca({ navigation, route }: BuscaProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();

    const modalRef = useRef<RBSheet>(null);

    const dimensoesTela = useWindowDimensions();
    const [alturaModal, setAlturaModal] = useState(0);

    const [modalAtual, setModalAtual] = useState<"filtrar" | "ordenar">("filtrar");

    const [carregando, setCarregando] = useState<boolean>(false);

    const [itens, setItens] = useState<Produto[] | Mercado[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [mercados, setMercados] = useState<Mercado[]>([]);

    const obterProdutos = async () => {
        setCarregando(true);

        try {
            const resposta = await produtoServices.getProdutos();

            setProdutos(resposta.data);
        }
        catch (erro: any) {
            notificar({
                estilo: "vermelho",
                texto: erro.response?.data?.erro || "Erro ao obter produtos",
                autoDispensar: true,
                dispensavel: true,
            });
        }
        finally {
            setCarregando(false);
        }
    }

    const obterMercados = async () => {
        setCarregando(true);

        try {
            const resposta = await mercadoServices.getMercados();

            setMercados(resposta.data);
        }
        catch (erro: any) {
            notificar({
                estilo: "vermelho",
                texto: erro.response?.data?.erro || "Erro ao obter mercados",
                autoDispensar: true,
                dispensavel: true,
            });
        }
        finally {
            setCarregando(false);
        }
    }

    const obterItens = async () => {
        setCarregando(true);

        try {
            const { data: mercados } = await mercadoServices.getMercados();
            const { data: produtos } = await produtoServices.getProdutos();

            setItens([...mercados, ...produtos]);
        }
        catch (erro) {
            notificar({
                estilo: "vermelho",
                texto: "Ocorreu um erro inesperado ao buscar.",
                icone: "x-circle",
                dispensavel: true,
                autoDispensar: true,
            });
        }
        finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        setAlturaModal(dimensoesTela.height * 0.65);
        obterItens();
    }, [dimensoesTela]);

    const ModalFiltrar = () => {

        return (
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={estilos.modalScrollview}>
                <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Sem filtros</Texto>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>ÉBomMesmo</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Ipê</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Qualidade</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Escute</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Age+</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>250g</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>500ml</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>1L</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>100g</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Kawahara Supermercado LTDA</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Extra Minimercado Doutor Campos Moura</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };

    const ModalOrdenar = () => {

        return (
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={estilos.modalScrollview}>
                <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Não ordenar</Texto>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Nome</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                            <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Maiores primeiro</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Menores primeiro</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };

    const componentesModal = {
        "filtrar": {
            titulo: "Filtrar resultados",
            componente: <ModalFiltrar />
        },
        "ordenar": {
            titulo: "Ordenar resultados",
            componente: <ModalOrdenar />
        }
    }

    const abrirModal = (modal: "filtrar" | "ordenar") => {
        setModalAtual(modal);
        modalRef.current?.open();
    }

    const ItemLista = ({ item }: ListRenderItemInfo<any>) => {

        return (
            <TouchableOpacity
                style={estilos.listaItem}
                onPress={
                    () => navigation.getParent()?.navigate(
                        item.cep ? "detalhesMercado" : "detalhesProduto",
                        { item }
                    )
                }
            >
                <Image style={estilos.listaItemImagem} source={require("../../../../assets/favicon.png")} />
                <Texto peso="700Bold" style={estilos.listaItemTexto} numberOfLines={1}>
                    {item.cep ?
                        item.nome
                        :
                        Formatador.formatarNomeProduto(item)
                    }
                </Texto>
            </TouchableOpacity >
        );
    };

    return (
        <View style={estilos.container}>
            {carregando &&
                <CarregandoOverlay />
            }
            <Modal
                titulo={componentesModal[modalAtual].titulo}
                refSheet={modalRef}
                height={alturaModal}
            >
                {componentesModal[modalAtual].componente}
            </Modal>
            <View>
                <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, { marginBottom: 16 }]}>Buscar</Texto>
                <Input placeholder="Escreva aqui sua pesquisa..." icone={<Feather name="search" style={estiloGlobal.inputIcone} />} />
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <TouchableOpacity onPress={() => abrirModal("filtrar")} style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
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
            </View>
            <View style={estilos.listaCabecalho}>
                <Texto peso="700Bold" style={estiloGlobal.subtitulo}>{itens.length} {itens.length === 1 ? "Resultado" : "Resultados"}</Texto>
                <TouchableOpacity onPress={() => abrirModal("ordenar")} style={estiloGlobal.tagPequenaNormal}>
                    <Texto style={estiloGlobal.tagPequenaNormalTexto}>Ordenar</Texto>
                    <Feather name="bar-chart" style={estiloGlobal.tagPequenaNormalTexto} />
                </TouchableOpacity>
            </View>
            <FlatList style={estilos.lista} data={itens} keyExtractor={(item, indice) => item.id + "" + indice} renderItem={ItemLista} />
        </View>
    );
}