import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, ListRenderItemInfo, TouchableOpacity, Image } from 'react-native';
import Produto from '../../../../interfaces/models/Produto';
import Modal from '../../../Modal';
import Texto from '../../../Texto';
import AutoComplete from '../../../AutoComplete';
import Botao from '../../../Botao';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../estiloGlobal';
import produtoServices from '../../../../services/produtoServices';
import { useNotificacaoToast } from '../../../../util/context/providers/notificacaoProvider';
import CarregandoOverlay from '../../../CarregandoOverlay';
import Sugestao from '../../../../interfaces/models/Sugestao';
import sugestaoServices from '../../../../services/sugestaoServices';
import estoqueServices from '../../../../services/estoqueServices';
import Formatador from '../../../../util/Formatador';
import { Feather } from '@expo/vector-icons';
import CarregandoSkeleton from '../../../CarregandoSkeleton';

interface ModalAdicionarProps {
    alturaModal?: number;
    forwardRef?: React.MutableRefObject<RBSheet | null>;
    adicionarSugestao: (item: Sugestao) => void;
}

type ItensListaPropsType = Partial<Sugestao> & {
    opcoes?: boolean;
};

export default function ModalAdicionar({
    alturaModal = 200,
    forwardRef,
    adicionarSugestao
}: ModalAdicionarProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [produtoSelecionado, selecionarProduto] = useState<Produto>();
    const [sugestaoSelecionada, selecionarSugestao] = useState<Sugestao>();
    const [carregando, setCarregando] = useState<boolean>(false);
    const [sugestoesCarregando, setSugestoesCarregando] = useState<boolean>(false);

    const aoConcluir = () => {
        selecionarProduto(undefined);
        selecionarSugestao(undefined);
        adicionarSugestao(sugestaoSelecionada!)
    };

    const obterProdutos = async () => {
        setCarregando(true);

        try {
            const { data: produtos } = await produtoServices.getProdutos();
            setProdutos(produtos);
        }
        catch (erro) {
            console.log(JSON.stringify(erro, null, 2));
            forwardRef?.current?.close();
            notificar({
                estilo: "vermelho",
                texto: "Ocorreu um problema ao obter os produtos.",
                icone: "info",
                dispensavel: true,
                autoDispensar: true
            });
        }
        finally {
            setCarregando(false);
        }
    };

    const obterSugestoes = async () => {
        setSugestoesCarregando(true);
        setSugestoes([]);
        selecionarSugestao(undefined);

        try {
            const { data: mercados } = await produtoServices.listarMercados(produtoSelecionado!.id || 0);

            for (const mercado of mercados) {
                const { data: estoqueData } = await estoqueServices.getEstoques({
                    filtros: {
                        mercadoId: mercado.id || 0,
                        produtoId: produtoSelecionado!.id || 0
                    }
                });

                const estoque = estoqueData[0];

                if (estoque) {
                    const { data: sugestaoData } = await sugestaoServices.getSugestoes({
                        filtros: {
                            estoqueId: estoque.id || 0
                        },
                        ordenado: {
                            ordenarPor: "timestamp",
                            ordem: "desc"
                        }
                    });

                    setSugestoes((sugestao) => [...sugestao, sugestaoData[0]]);
                }
            };
        }
        catch (erro: any) {
            if (erro.response.status !== 404) {
                console.log(JSON.stringify(erro, null, 2));
                forwardRef?.current?.close();
                notificar({
                    estilo: "vermelho",
                    texto: "Ocorreu um problema ao obter os mercados.",
                    icone: "info",
                    dispensavel: true,
                    autoDispensar: true
                });
            }
        }
        finally {
            setSugestoesCarregando(false);
        }
    };

    useEffect(() => {
        obterProdutos();
    }, []);

    useEffect(() => {
        if (produtoSelecionado?.id)
            obterSugestoes();
    }, [produtoSelecionado]);

    const ItemLista = (props: ListRenderItemInfo<ItensListaPropsType>) => {

        return (
            <TouchableOpacity style={estilos.listaItem} onPress={() => selecionarSugestao(props.item)}>
                <View style={estilos.listaItemImagemContainer}>
                    {sugestaoSelecionada?.id === props.item.id &&
                        <View style={[estiloGlobal.tagPequenaDestaque, estilos.listaItemSelecionadoBadge]}>
                            <Feather style={[estiloGlobal.tagPequenaDestaqueTexto, { fontSize: 24 }]} name="check-circle" />
                        </View>
                    }
                    <Image style={estilos.listaItemImagem} source={{ uri: "https://i.pinimg.com/originals/b1/f0/93/b1f093fb7e294260afe1cae34996eb33.jpg" }} />
                </View>
                <View style={estilos.listaItemInfos}>
                    <Texto peso="800ExtraBold" style={estilos.listaItemTexto} numberOfLines={1}>{props.item.estoque?.mercado?.nome}</Texto>
                    <Texto style={estilos.listaItemMercado} numberOfLines={1}>{props.item.estoque?.mercado?.logradouro}, {props.item.estoque?.mercado?.numero}</Texto>
                </View>
                <Texto peso="700Bold" style={estilos.listaItemPreco} numberOfLines={1}>{Formatador.formatarMoeda(props.item.preco || 0)}</Texto>
            </TouchableOpacity>
        );
    };

    const ItemListaPlaceholder = () => {

        return (
            <View style={[estilos.listaItem, { alignItems: "flex-start" }]}>
                <CarregandoSkeleton width={50} height={50} />
                <View style={[estilos.listaItemInfos, { gap: 10, marginLeft: 8 }]}>
                    <CarregandoSkeleton width={100} height={16} />
                    <CarregandoSkeleton width={200} height={16} />
                </View>
                <CarregandoSkeleton width={50} height={16} />
            </View>
        );
    };

    return (
        <Modal titulo="Adicionar item à lista" refSheet={forwardRef} height={alturaModal}>
            <View style={estilos.modalContainer}>
                {carregando &&
                    <CarregandoOverlay />
                }
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={estiloGlobal.subtitulo}>Selecione o produto</Texto>
                    <AutoComplete dados={produtos} aoSelecionar={selecionarProduto} extrairChave={(item) => Formatador.formatarNomeProduto(item)} placeholder="Escolha um produto..." icone="shopping-bag" />
                </View>
                <View style={{ flex: 1 }}>
                    {produtoSelecionado &&
                        <>
                            <Texto peso="700Bold" style={[estiloGlobal.subtitulo, { marginBottom: 16 }]}>Escolha onde quer comprar</Texto>
                            {sugestoesCarregando ?
                                <>
                                    <ItemListaPlaceholder />
                                    <ItemListaPlaceholder />
                                    <ItemListaPlaceholder />
                                </>
                                :
                                <FlatList
                                    style={estilos.modalLista}
                                    data={sugestoes}
                                    renderItem={(props: ListRenderItemInfo<ItensListaPropsType>) => <ItemLista {...props} />}
                                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                                    ListEmptyComponent={<Texto style={{ color: "#aaa" }}>Este produto ainda não foi sugerido.</Texto>}
                                />
                            }
                        </>
                    }
                </View>
                <Botao
                    onPress={aoConcluir}
                    disabled={produtoSelecionado && sugestaoSelecionada ? false : true}
                    titulo={produtoSelecionado && sugestaoSelecionada ? "Adicionar à lista" : "Selecione o produto e o mercado"}
                    subtitulo={produtoSelecionado && sugestaoSelecionada ? Formatador.formatarMoeda(sugestaoSelecionada?.preco!) : ""}
                    icone="shopping-bag"
                />
            </View>
        </Modal>
    );
};