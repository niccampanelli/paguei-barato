import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import Texto from '../../../../Texto';
import Input from '../../../../Input';
import Botao from '../../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FluxoCriarProdutoParams } from '..';
import Produto from '../../../../../interfaces/models/Produto';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import produtoSchema from '../../../../../interfaces/schemas/Produto';
import categoriaServices from '../../../../../services/categoriaServices';
import AutoComplete from '../../../../AutoComplete';
import CarregandoOverlay from '../../../../CarregandoOverlay';

type InformacoesProps = NativeStackScreenProps<FluxoCriarProdutoParams, "informacoes">;

const valoresIniciais: Produto = {
    nome: "",
    marca: "",
    tamanho: "",
    cor: "",
    categoriaId: 0,
    categoria: {
        id: 0,
        nome: "",
        descricao: "",
    },
    criadoPor: 0,
};

export default function EtapaInformacoes({ navigation, route }: InformacoesProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
        setValue,
    } = useForm({
        resolver: yupResolver(produtoSchema),
        mode: "all",
        defaultValues: valoresIniciais
    });

    const [categorias, setCategorias] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(false);

    const descricaoCategoriaInputRef = useRef<TextInput>(null);
    const nomeInputRef = useRef<TextInput>(null);
    const marcaInputRef = useRef<TextInput>(null);
    const tamanhoInputRef = useRef<TextInput>(null);
    const corInputRef = useRef<TextInput>(null);

    const obterCategorias = async () => {
        setCarregando(false);

        try {
            const { data } = await categoriaServices.getCategorias();
            setCategorias(data);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    const proximo = (produto: Produto) => {
        if (!isValid || carregando) return;
        navigation.navigate("imagens", { produto });
    }

    useEffect(() => {
        obterCategorias();
    });

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
                    Criar produto
                </Texto>
                <Texto style={estiloGlobal.texto}>Caso você tenha percebido que algum produto ainda não está no aplicativo, você pode cadastrá-lo aqui.</Texto>
                <KeyboardAvoidingView behavior="padding" style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Categoria</Texto>
                        <Controller
                            control={control}
                            name="categoria"
                            render={({ field: { onChange } }) => (
                                <AutoComplete
                                    icone="tag"
                                    returnKeyType='next'
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => descricaoCategoriaInputRef.current?.focus()}
                                    textContentType='givenName'
                                    autoCapitalize='words'
                                    autoCorrect={true}
                                    placeholder="Hortifruti, Limpeza, Carnes..."
                                    extrairChave={(categoria) => categoria.nome!}
                                    aoSelecionar={(categoria) => onChange(categoria)}
                                    aoSelecionarPadrao={(nome) => {
                                        onChange({ nome, descricao: "" });
                                        setValue("categoriaId", 0 as never, { shouldValidate: true, shouldDirty: true });
                                    }}
                                    dados={categorias}
                                />
                            )}
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Descrição da categoria</Texto>
                        <Controller
                            control={control}
                            name="categoria"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="tag" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => nomeInputRef.current?.focus()}
                                    forwardRef={descricaoCategoriaInputRef}
                                    textContentType="none"
                                    autoCapitalize="sentences"
                                    autoCorrect={true}
                                    value={value?.descricao}
                                    onChangeText={(texto) => onChange({ ...value, descricao: texto })}
                                    placeholder="Descrição sobre essa categoria de produtos"
                                    erro={errors.categoria?.descricao?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Nome</Texto>
                        <Controller
                            control={control}
                            name="nome"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="shopping-bag" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => marcaInputRef.current?.focus()}
                                    forwardRef={nomeInputRef}
                                    textContentType="givenName"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Molho De Tomate"
                                    erro={errors.nome?.message}
                                />
                            )}
                        />
                    </View>
                    <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                        Detalhes do produto
                    </Texto>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Marca</Texto>
                        <Controller
                            control={control}
                            name="marca"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="award" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => tamanhoInputRef.current?.focus()}
                                    forwardRef={marcaInputRef}
                                    textContentType="none"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="BomDemais"
                                    erro={errors.marca?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Tamanho, peso ou quantidade</Texto>
                        <Controller
                            control={control}
                            name="tamanho"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="minimize-2" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => corInputRef.current?.focus()}
                                    forwardRef={tamanhoInputRef}
                                    textContentType="none"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="250g"
                                    erro={errors.tamanho?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Cor, sabor ou variação</Texto>
                        <Controller
                            control={control}
                            name="cor"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="coffee" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="done"
                                    onSubmitEditing={handleSubmit(proximo)}
                                    forwardRef={corInputRef}
                                    blurOnSubmit={true}
                                    textContentType="none"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Bolonhesa"
                                    erro={errors.cor?.message}
                                />
                            )}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao
                    titulo={"Próxima etapa"}
                    icone="arrow-right"
                    onPress={handleSubmit(proximo)}
                />
            </View>
        </View>
    );
}