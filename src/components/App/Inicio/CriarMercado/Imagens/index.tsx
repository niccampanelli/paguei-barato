import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import Texto from '../../../../Texto';
import Botao from '../../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FluxoCriarMercadoParams } from '..';
import CarregandoOverlay from '../../../../CarregandoOverlay';
import { useNotificacaoToast } from '../../../../../util/context/providers/notificacaoProvider';
import customSearchServices from '../../../../../services/customSearchServices';
import { ItensPesquisaImagens } from '../../../../../interfaces/models/PesquisaImagens';
import Mercado from '../../../../../interfaces/models/Mercado';
import mercadoServices from '../../../../../services/mercadoServices';

export interface ImagensParams {
    mercado: Mercado
};

type ImagensProps = NativeStackScreenProps<FluxoCriarMercadoParams, "imagens">;

export default function EtapaImagens({ navigation, route }: ImagensProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();

    const [carregando, setCarregando] = useState<boolean>(false);
    const [atingiuLimite, setAtingiuLimite] = useState<boolean>(false);

    const [mercado, setMercado] = useState<Mercado>(route.params.mercado);
    const [imagens, setImagens] = useState<ItensPesquisaImagens[]>([]);
    const [pagina, setPagina] = useState<number>(1);

    const [imagemSelecionada, setImagemSelecionada] = useState<number | undefined>();


    const obterImagens = async () => {
        if (pagina > 2)
            return;

        setCarregando(true);

        try {
            const consulta = `${mercado.ramo?.nome} ${mercado.nome}`;

            const resposta = await customSearchServices.search({
                consulta: consulta,
                termosExatos: mercado.nome || "",
                pagina: pagina,
            });

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
                    texto: "Ocorreu um erro inesperado ao buscar as imagens para o estabelecimento.",
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
            const resultado = await mercadoServices.criarMercado(mercado);

            if (resultado.data.id) {
                notificar({
                    estilo: "destaque",
                    texto: `Estabelecimento "${mercado.nome}" criado com sucesso com o ID ${resultado.data.id}.`,
                    icone: "check-circle",
                    dispensavel: true,
                    autoDispensar: true,
                });

                navigation.getParent()?.navigate("detalhesMercado", { item: resultado.data });
            }
            else {
                throw "Erro ao criar estabelecimento.";
            }
        }
        catch (erro: any) {
            notificar({
                estilo: "vermelho",
                texto: `Erro ao criar estabelecimento: ${erro}`,
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
                    <Texto style={estiloGlobal.texto}>No momento não estamos conseguindo buscar as imagens para o estabelecimento. Mas não se preocupe, você ainda pode concluir seu cadastro normalmente e mais tarde, quando tudo estiver normalizado, poderá inserir uma imagem.</Texto>
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
                        <Texto style={estiloGlobal.texto}>Selecione abaixo a logotipo do estabelecimento que está criando. Se nenhuma das imagens listadas for a logotipo correta, escolha a imagem que mostre uma fachada parecida.</Texto>
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