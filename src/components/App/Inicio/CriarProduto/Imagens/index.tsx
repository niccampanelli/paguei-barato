import { Feather } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import Texto from '../../../../Texto';
import Input from '../../../../Input';
import Botao from '../../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FluxoCriarProdutoParams } from '..';
import Produto from '../../../../../interfaces/models/Produto';
import produtoServices from '../../../../../services/produtoServices';
import CarregandoOverlay from '../../../../CarregandoOverlay';
import { useNotificacaoToast } from '../../../../../util/context/providers/notificacaoProvider';
import customSearchServices from '../../../../../services/customSearchServices';
import { ItensPesquisaImagens } from '../../../../../interfaces/models/PesquisaImagens';
import categoriaServices from '../../../../../services/categoriaServices';

export interface ImagensParams {
    produto: Produto
};

type ImagensProps = NativeStackScreenProps<FluxoCriarProdutoParams, "imagens">;

export default function EtapaImagens({ navigation, route }: ImagensProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();

    const [carregando, setCarregando] = useState<boolean>(false);
    const [atingiuLimite, setAtingiuLimite] = useState<boolean>(false);

    const [produto, setProduto] = useState<Produto>(route.params.produto);
    const [imagens, setImagens] = useState<ItensPesquisaImagens[]>([]);
    const [pagina, setPagina] = useState<number>(1);

    const [imagemSelecionada, setImagemSelecionada] = useState<number | undefined>();


    const obterImagens = async () => {
        if (pagina > 2)
            return;

        setCarregando(true);

        try {
            const consulta = `${route.params.produto.nome} ${route.params.produto.marca} ${route.params.produto.cor || ""} ${route.params.produto.tamanho || ""}`;

            const resposta = await customSearchServices.search({
                consulta: consulta,
                termosExatos: route.params.produto.nome || "",
                pagina: pagina,
            });

            if (resposta.data.items === undefined || resposta.data.items.length === 0) {
                setImagens([]);
                return;
            }

            setImagens((imgs) => [...imgs, ...resposta.data.items]);
            setPagina((p) => p + 1);
        }
        catch (erro: any) {

            if (erro.response?.status === 429) {
                setAtingiuLimite(true);
            }
            else {
                notificar({
                    estilo: "vermelho",
                    texto: "Ocorreu um erro inesperado ao buscar as imagens para o produto.",
                    icone: "x-circle",
                    dispensavel: true,
                    autoDispensar: true,
                });

                navigation.getParent()?.goBack();
            }
        }
        finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const buscaInicial = async () => {
            await obterImagens();
        };

        buscaInicial();
    }, []);

    const concluir = async () => {
        setCarregando(true);

        try {
            if (produto.categoria?.id) {
                const { data: categoria } = await categoriaServices.criarCategoria({
                    nome: produto.categoria?.nome || "",
                    descricao: produto.categoria?.descricao
                })

                if (categoria.id) {
                    produto.categoria!.id = categoria.id;
                }
                else {
                    throw "Erro ao criar estabelecimento.";
                }
            }

            const resultado = await produtoServices.criarProduto(produto);

            if (resultado.data.id) {
                notificar({
                    estilo: "destaque",
                    texto: `Produto "${produto.nome}" criado com sucesso com o ID ${resultado.data.id}.`,
                    icone: "check-circle",
                    dispensavel: true,
                    autoDispensar: true,
                });

                navigation.getParent()?.navigate("detalhesProduto", { item: resultado.data });
                navigation.getParent()?.reset({
                    index: 0,
                    routes: [{ name: "detalhesProduto", params: { item: resultado.data } }],
                });
            }
            else {
                throw "Erro ao criar produto.";
            }
        }
        catch (erro: any) {
            notificar({
                estilo: "vermelho",
                texto: `Erro ao criar produto: ${erro}`,
                icone: "x-circle",
                dispensavel: true,
                autoDispensar: true,
            });

            navigation.goBack();
        }
        finally {
            setCarregando(false);
        }
    };

    const obterMargemItem = (index: number) => {
        if (index % 2 === 0)
            return { esquerda: 0, direita: "1%" };
        else
            return { esquerda: "1%", direita: 0 };
    };

    const CadastroSemImagem = () => {

        return (
            <View style={estilos.container}>
                <View style={estilos.cabecalho}>
                    <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, { marginBottom: 16 }]}>
                        Escolha uma imagem
                    </Texto>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, { marginBottom: 16 }]}>
                        Ah não {":("}
                    </Texto>
                    <Texto style={estiloGlobal.texto}>No momento não estamos conseguindo buscar as imagens para o produto. Mas não se preocupe, você ainda pode concluir o cadastro do produto normalmente e mais tarde, quando tudo estiver normalizado, poderá inserir uma imagem.</Texto>
                </View>
            </View>
        );
    };

    const ItemLista = ({ item, index }: { item: ItensPesquisaImagens, index: number }) => {

        return (
            <TouchableOpacity
                style={[
                    estilos.listaItem,
                    {
                        marginVertical: "1%",
                        marginLeft: obterMargemItem(index).esquerda,
                        marginRight: obterMargemItem(index).direita,
                    }
                ]}
                onPress={() => setImagemSelecionada(index)}
            >
                {imagemSelecionada === index &&
                    <View style={[estilos.listaItemSelecionadoBadge, estiloGlobal.tagPequenaDestaque]}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>Selecionada</Texto>
                    </View>
                }
                <Image
                    source={{ uri: item.link }}
                    style={estilos.listaItemImagem}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={estilos.main}>
            {carregando &&
                <CarregandoOverlay />
            }
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" style={estiloGlobal.tagPequenaNormalTexto} />
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Texto>
            </TouchableOpacity>
            {atingiuLimite ?
                <CadastroSemImagem />
                :
                <View style={estilos.container}>
                    <View style={estilos.cabecalho}>
                        <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, { marginBottom: 16 }]}>
                            Escolha uma imagem
                        </Texto>
                        <Texto style={estiloGlobal.texto}>Selecione uma das imagens abaixo que mais se parece com o produto que está criando.</Texto>
                    </View>
                    <FlatList
                        data={imagens}
                        renderItem={({ item, index }) => <ItemLista item={item} index={index} />}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={estilos.lista}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        onEndReached={pagina !== 1 ? () => obterImagens() : undefined}
                    />
                </View>
            }
            <View style={estilos.botaoAdicionarView}>
                <Botao titulo="Concluir e adicionar" icone="check-circle" onPress={concluir} />
            </View>
        </View>
    );
}