import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import Texto from '../../../Texto';
import Input from '../../../Input';
import Botao from '../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackExternaRoutesParams } from '../../../../StackExterna';
import Sugestao from '../../../../interfaces/models/Sugestao';
import Produto from '../../../../interfaces/models/Produto';
import Mercado from '../../../../interfaces/models/Mercado';
import AutoComplete from '../../../AutoComplete';
import produtoServices from '../../../../services/produtoServices';
import mercadoServices from '../../../../services/mercadoServices';
import Formatador from '../../../../util/Formatador';
import CarregandoOverlay from '../../../CarregandoOverlay';
import estoqueServices from '../../../../services/estoqueServices';
import sugestaoServices from '../../../../services/sugestaoServices';

type CriarSugestaoProps = NativeStackScreenProps<StackExternaRoutesParams, "criarSugestao">;

export default function CriarSugestao({ navigation, route }: CriarSugestaoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [carregando, setCarregando] = useState<boolean>(false);

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [mercados, setMercados] = useState<Mercado[]>([]);

    const [produto, setProduto] = useState<Produto>({});
    const [mercado, setMercado] = useState<Mercado>({} as any);
    const [preco, setPreco] = useState<number>(0);

    const mercadoInputRef = useRef<TextInput>(null);
    const precoInputRef = useRef<TextInput>(null);

    const concluir = async () => {
        setCarregando(true);
        
        const concluirSugestao = async (estoqueId: number) => {
        
            const respostaSugestao = await sugestaoServices.criarSugestao({
                estoqueId: estoqueId,
                preco: preco
            });

            const sugestao = respostaSugestao.data;
            const sugestaoComRelacoes = await sugestaoServices.buscarRelacoesSugestao(sugestao);

            navigation.replace("detalhesEstoque", { item: sugestaoComRelacoes });
        };

        try {
            const respostaEstoque = await estoqueServices.criarEstoque(produto.id || 0, mercado.id || 0);
            const estoque = respostaEstoque.data;

            await concluirSugestao(estoque.id || 0);
        }
        catch (erro: any) {
            console.log(JSON.stringify(erro, null, 2));

            try {
                if (erro.response.status === 409) {
                    const respostaEstoque = await estoqueServices.getEstoques({
                        filtros: {
                            mercadoId: mercado.id || 0,
                            produtoId: produto.id || 0,
                        }
                    })
                    const estoque = respostaEstoque.data[0];

                    await concluirSugestao(estoque.id || 0);
                }
            }
            catch (erro: any) {
                console.log(JSON.stringify(erro, null, 2));
            }
        }
        finally {
            setCarregando(false);
        }
    };

    const obterItens = async () => {
        setCarregando(true);

        try {
            const respostaProdutos = await produtoServices.getProdutos();
            setProdutos(respostaProdutos.data);
            
            const respostaMercados = await mercadoServices.getMercados();
            setMercados(respostaMercados.data);
        }
        catch (erro) {
            console.log(JSON.stringify(erro, null, 2));
        }
        finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        obterItens();
    }, []);

    return (
        <View style={estilos.main}>
            {carregando &&
                <CarregandoOverlay />
            }
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" style={estiloGlobal.tagPequenaNormalTexto} />
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Texto>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={estilos.container}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, { marginBottom: 16 }]}>
                    Nova sugestão de preço
                </Texto>
                <Texto style={estiloGlobal.texto}>Aqui você pode atualizar o preço de um produto em um mercado, ou sugerir um preço que ainda não está no aplicativo.</Texto>
                <KeyboardAvoidingView behavior="padding" style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>De qual produto deseja sugerir um preço?</Texto>
                        <AutoComplete
                            icone="shopping-bag"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => mercadoInputRef.current?.focus()}
                            textContentType="givenName"
                            autoCapitalize="words"
                            autoCorrect={true}
                            dados={produtos}
                            extrairChave={(produto) => Formatador.formatarNomeProduto(produto)}
                            aoSelecionar={(selecionado) => setProduto(selecionado)}
                            placeholder="Nome do produto"
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Em qual mercado se encontra o produto que irá sugerir o preço?</Texto>
                        <AutoComplete
                            icone="shopping-cart"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => precoInputRef.current?.focus()}
                            forwardRef={mercadoInputRef}
                            textContentType="organizationName"
                            autoCapitalize="words"
                            autoCorrect={false}
                            dados={mercados}
                            extrairChave={(mercado) => mercado.nome || ""}
                            aoSelecionar={(selecionado) => setMercado(selecionado)}
                            placeholder="Mercado onde está o produto"
                        />

                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Qual o preço do produto que está sugerindo?</Texto>
                        <Input
                            icone={<Texto style={estiloGlobal.inputIcone}>R$</Texto>}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            forwardRef={precoInputRef}
                            keyboardType="numeric"
                            value={preco.toString()}
                            onChangeText={(texto) => setPreco(Number(texto))}
                            placeholder="3,99"
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao
                    titulo="Concluir"
                    icone="arrow-right"
                    onPress={concluir}
                />
            </View>
        </View>
    );
}