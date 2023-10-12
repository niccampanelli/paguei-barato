import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItemInfo, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Modal from "../../Modal";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import objetoUtils from "../../../util/objetoUtils";

type BuscaProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "buscar">;

type TiposModal = "filtrar" | "ordenar" | "limpar";

export default function Busca({ navigation, route }: BuscaProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();

    const modalRef = useRef<RBSheet>(null);

    const dimensoesTela = useWindowDimensions();

    const [modalAtual, setModalAtual] = useState<TiposModal>("filtrar");
    const [carregando, setCarregando] = useState<boolean>(false);

    const [textoPesquisa, setTextoPesquisa] = useState<string>("");
    const [pesquisa, setPesquisa] = useState<string>("");
    const [pesquisaTimeout, setPesquisaTimeout] = useState<NodeJS.Timeout | null>(null);
    const [itens, setItens] = useState<Array<Produto | Mercado>>([]);
    const [itensRecentes, setItensRecentes] = useState<Array<Produto | Mercado>>([]);

    const efetuarPesquisa = async () => {
        setCarregando(true);

        try {
            const { data: mercados } = await mercadoServices.pesquisarMercados(pesquisa);
            const { data: produtos } = await produtoServices.pesquisarProdutos(pesquisa);

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
        if (pesquisa === "") {
            setItens([]);
            return;
        }

        if (pesquisaTimeout)
            clearTimeout(pesquisaTimeout);

        const timeout = setTimeout(() => {
            efetuarPesquisa();
        }, 200);

        setPesquisaTimeout(timeout);

        return () => clearTimeout(timeout);
    }, [pesquisa.trim()]);

    useEffect(() => {
        const obterItensRecentes = async () => {
            const itensRecentesJson = await AsyncStorage.getItem("itensBuscaRecentes");
            const itensRecentes: any[] = itensRecentesJson ? JSON.parse(itensRecentesJson) : [];

            setItensRecentes(itensRecentes);
        };

        obterItensRecentes();
    }, []);

    const itensOrdenadosFiltrados = [...itens].sort((a, b) => {
        return a.id! - b.id!;
    });

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

    const ModalLimpar = () => {

        return (
            <View>
                <Texto style={estiloGlobal.texto}>Deseja mesmo limpar a lista de buscas recentes?</Texto>
            </View>
        );
    };

    const componentesModal: { [key in TiposModal]: {
        titulo: string,
        componente: JSX.Element,
        altura: number,
        aoPressionarBotaoPrincipal: () => void
    } } = {
        "filtrar": {
            titulo: "Filtrar resultados",
            componente: <ModalFiltrar />,
            altura: dimensoesTela.height * 0.65,
            aoPressionarBotaoPrincipal: () => { }
        },
        "ordenar": {
            titulo: "Ordenar resultados",
            componente: <ModalOrdenar />,
            altura: dimensoesTela.height * 0.65,
            aoPressionarBotaoPrincipal: () => { }
        },
        "limpar": {
            titulo: "Limpar buscas recentes",
            componente: <ModalLimpar />,
            altura: 220,
            aoPressionarBotaoPrincipal: () => {
                setItensRecentes([]);
                AsyncStorage.removeItem("itensBuscaRecentes");
                modalRef.current?.close();
                notificar({
                    estilo: "normal",
                    texto: "As buscas recentes foram removidas do histórico com sucesso.",
                    icone: "check-circle",
                    dispensavel: true,
                    autoDispensar: true,
                });
            }
        }
    }

    const abrirModal = (modal: TiposModal) => {
        setModalAtual(modal);
        modalRef.current?.open();
    }

    const ItemLista = ({ item }: ListRenderItemInfo<Produto | Mercado>) => {

        const abrirItem = async () => {
            var itensRecentesTemp = [...itensRecentes];
            const itemNaLista = itensRecentes.findIndex(itemRecente => itemRecente.id === item.id);

            if (itemNaLista !== -1) {
                itensRecentesTemp.unshift(itensRecentesTemp.splice(itemNaLista, 1)[0]);
            } else {
                itensRecentesTemp.unshift(item);
            }

            setItensRecentes(itensRecentesTemp);
            await AsyncStorage.setItem("itensBuscaRecentes", JSON.stringify(itensRecentesTemp));

            if ("cep" in item) {
                navigation.getParent()?.navigate("detalhesMercado", { item });
            } else {
                navigation.getParent()?.navigate("detalhesProduto", { item });
            }
        };

        return (
            <TouchableOpacity
                style={estilos.listaItem}
                onPress={abrirItem}
            >
                <View style={estilos.listaItemImagemContainer}>
                    <Image style={estilos.listaItemImagem} source={{ uri: "https://fortatacadista.vteximg.com.br/arquivos/ids/303375-800-800/7891150086845.jpg?v=637962759180930000" }} />
                </View>
                <View style={estilos.listaItemInfos}>
                    <Texto peso="700Bold" style={estilos.listaItemTexto} numberOfLines={1}>
                        {"cep" in item ?
                            item.nome
                            :
                            Formatador.formatarNomeProduto(item)
                        }
                    </Texto>
                    <Texto style={estilos.listaItemTipo} numberOfLines={1}>
                        {"cep" in item ?
                            "Mercado • " + item.logradouro + ", " + item.numero
                            :
                            "Produto • " + item.marca
                        }
                    </Texto>
                </View>
            </TouchableOpacity >
        );
    };

    const ListaVazia = () => {

        return (
            <View>
                {!carregando &&
                    <Texto style={estiloGlobal.texto}>
                        {pesquisa === "" ?
                            "Os produtos e mercados que você pesquisar serão mostrados aqui."
                            :
                            "Nenhum produto ou mercado foi encontrado com a pesquisa digitada. Verifique se a pesquisa está correta e tente novamente."
                        }
                    </Texto>
                }
            </View>
        );
    }

    return (
        <View style={estilos.container}>
            <Modal
                titulo={componentesModal[modalAtual].titulo}
                refSheet={modalRef}
                height={componentesModal[modalAtual].altura}
                possuiBotoes={modalAtual === "limpar"}
                labelBotaoPrincipal="Limpar"
                labelBotaoSecundario="Cancelar"
                aoPressionarBotaoPrincipal={componentesModal[modalAtual].aoPressionarBotaoPrincipal}
                aoPressionarBotaoSecundario={() => modalRef.current?.close()}
            >
                {componentesModal[modalAtual].componente}
            </Modal>
            <View style={estilos.cabecalho}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, { marginBottom: 16 }]}>Buscar</Texto>
                <Input
                    placeholder="Escreva aqui sua pesquisa..."
                    icone={<Feather name="search" style={estiloGlobal.inputIcone} />}
                    value={textoPesquisa}
                    onChangeText={t => {
                        setTextoPesquisa(t);
                        setPesquisa(t.trim());
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                {carregando &&
                    <CarregandoOverlay />
                }
                {/* {itensOrdenadosFiltrados.length > 0 && pesquisa !== "" &&
                    <View style={estilos.filtros}>
                        <TouchableOpacity onPress={() => abrirModal("filtrar")} style={estiloGlobal.tagPequenaDestaque}>
                            <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>
                                {quantidadeFiltros > 0 ? "Filtros" : "Filtrar"}
                            </Texto>
                            {quantidadeFiltros > 0 &&
                                <Texto peso="800ExtraBold" style={estilos.filtroContador}>• {quantidadeFiltros}</Texto>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={estiloGlobal.tagPequenaSecundaria}>
                            <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>
                                Sem filtros
                            </Texto>
                        </TouchableOpacity>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={estilos.listaFiltrosContainer}>
                            {obterFiltrosSelecionados().map((filtro) => (
                                <View key={filtro.nome} style={estiloGlobal.tagPequenaSecundaria}>
                                    <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>{filtro.nome} {filtro.valor}</Texto>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                } */}
                <View style={estilos.listaCabecalho}>
                    {!carregando &&
                        <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                            {
                                pesquisa !== "" ?
                                    itensOrdenadosFiltrados.length > 0 ?
                                        `${itensOrdenadosFiltrados.length} ${itensOrdenadosFiltrados.length === 1 ? "Resultado" : "Resultados"}`
                                        :
                                        "Nenhum resultado"
                                    :
                                    "Buscados recentemente"
                            }
                        </Texto>
                    }
                    {itensOrdenadosFiltrados.length > 0 && pesquisa !== "" ?
                        <></>
                        // <TouchableOpacity onPress={() => abrirModal("ordenar")} style={ordemSelecionado?.por === "id" ? estiloGlobal.tagPequenaNormal : estiloGlobal.tagPequenaSecundaria}>
                        //     <Texto style={estiloGlobal.tagPequenaNormalTexto}>
                        //         {ordemSelecionado?.por === "id" ? "Ordenar" : ordemSelecionado?.por}
                        //     </Texto>
                        //     <Feather
                        //         name={ordemSelecionado?.por === "id" ? "bar-chart" : ordemSelecionado?.crescente ? "trending-up" : "trending-down"}
                        //         style={ordemSelecionado?.por === "id" ? estiloGlobal.tagPequenaNormalTexto : estiloGlobal.tagPequenaSecundariaTexto}
                        //     />
                        // </TouchableOpacity>
                        :
                        itensRecentes.length > 0 &&
                        <TouchableOpacity onPress={() => abrirModal("limpar")} style={estiloGlobal.tagPequenaNormal}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Limpar</Texto>
                            <Feather name="x" style={estiloGlobal.tagPequenaNormalTexto} />
                        </TouchableOpacity>
                    }
                </View>
                <FlatList
                    style={estilos.lista}
                    contentContainerStyle={estilos.listaContainer}
                    data={pesquisa !== "" ?
                        itens.length !== 0 ?
                            itensOrdenadosFiltrados
                            :
                            []
                        :
                        itensRecentes
                    }
                    ListEmptyComponent={ListaVazia}
                    keyExtractor={(item, indice) => item.id + "" + indice}
                    renderItem={ItemLista}
                />
            </View>
        </View>
    );
}