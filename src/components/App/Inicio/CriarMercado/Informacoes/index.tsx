import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import Texto from '../../../../Texto';
import Input from '../../../../Input';
import Botao from '../../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FluxoCriarMercadoParams } from '..';
import Mercado from '../../../../../interfaces/models/Mercado';
import ramoServices from '../../../../../services/ramoServices';
import Ramo from '../../../../../interfaces/models/Ramo';
import AutoComplete from '../../../../AutoComplete';
import CarregandoOverlay from '../../../../CarregandoOverlay';
import enderecoServices from '../../../../../services/enderecoServices';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import mercadoSchema from '../../../../../interfaces/schemas/Mercado';

type InformacoesProps = NativeStackScreenProps<FluxoCriarMercadoParams, "informacoes">;

const valoresIniciais: Mercado = {
    nome: "",
    cep: "",
    logradouro: "",
    numero: 0,
    complemento: undefined,
    bairro: "",
    cidade: "",
    uf: "AC",
    ramoId: 0,
    ramo: {
        nome: "",
        descricao: ""
    }
}

export default function EtapaInformacoes({ navigation, route }: InformacoesProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(mercadoSchema),
        mode: "all",
        defaultValues: valoresIniciais
    });

    const [ramos, setRamos] = useState<Ramo[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [cepPreenchido, setCepPreenchido] = useState<boolean>(false);

    const descricaoRamoInputRef = useRef<TextInput>(null);
    const nomeInputRef = useRef<TextInput>(null);
    const cepInputRef = useRef<TextInput>(null);
    const logradouroInputRef = useRef<TextInput>(null);
    const numeroInputRef = useRef<TextInput>(null);
    const complementoInputRef = useRef<TextInput>(null);
    const bairroInputRef = useRef<TextInput>(null);
    const cidadeInputRef = useRef<TextInput>(null);
    const ufInputRef = useRef<TextInput>(null);

    const proximo = (mercado: Mercado) => {
        if (!isValid || !cepPreenchido || carregando) return;
        navigation.navigate("imagens", { mercado });
    }

    const obterRamos = async () => {
        setCarregando(false);

        try {
            const { data } = await ramoServices.getRamos();
            setRamos(data);
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    const obterEndereco = async () => {
        setCarregando(true);

        try {
            const { data } = await enderecoServices.getEnderecoViaCep(getValues().cep);
            setValue("logradouro", data.logradouro as never, { shouldValidate: true, shouldDirty: true });
            setValue("bairro", data.bairro as never, { shouldValidate: true, shouldDirty: true });
            setValue("cidade", data.localidade as never, { shouldValidate: true, shouldDirty: true });
            setValue("uf", data.uf as never, { shouldValidate: true, shouldDirty: true });

            numeroInputRef.current?.focus();
        }
        catch (erro) {
            console.log(erro);
        }
        finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        obterRamos();
    }, []);

    useEffect(() => {
        if (getValues().cep.length === 9) {
            obterEndereco();
            setCepPreenchido(true);
        }
        else {
            setCepPreenchido(false);
        }
    }, [watch("cep")]);

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
                    Criar estabelecimento
                </Texto>
                <Texto style={estiloGlobal.texto}>Aqui você pode criar mercados, farmácias, padarias e outros estabelecimentos que ainda não estão cadastrados no aplicativo.</Texto>
                <KeyboardAvoidingView behavior="padding" style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Ramo</Texto>
                        <Controller
                            control={control}
                            name="ramo"
                            render={({ field: { onChange } }) => (
                                <AutoComplete
                                    icone="tag"
                                    returnKeyType='next'
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => descricaoRamoInputRef.current?.focus()}
                                    textContentType='givenName'
                                    autoCapitalize='words'
                                    autoCorrect={true}
                                    placeholder="Supermercado, farmácia, padaria..."
                                    extrairChave={(ramo) => ramo.nome}
                                    aoSelecionar={(ramo) => onChange(ramo)}
                                    aoSelecionarPadrao={(nome) => {
                                        onChange({ nome, descricao: "" });
                                        setValue("ramoId", 0 as never, { shouldValidate: true, shouldDirty: true });
                                    }}
                                    dados={ramos}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Descricao do ramo</Texto>
                        <Controller
                            control={control}
                            name="ramo"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="tag" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => nomeInputRef.current?.focus()}
                                    forwardRef={descricaoRamoInputRef}
                                    textContentType="none"
                                    autoCapitalize="sentences"
                                    autoCorrect={true}
                                    value={value?.descricao}
                                    onChangeText={(texto) => onChange({ ...value, descricao: texto })}
                                    placeholder="Descrição sobre esse tipo de loja"
                                    erro={errors?.ramo?.descricao?.message}
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
                                    icone={<Feather name="shopping-cart" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => cepInputRef.current?.focus()}
                                    forwardRef={nomeInputRef}
                                    textContentType="organizationName"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nome do estabelecimento"
                                    erro={errors?.nome?.message}
                                />
                            )}
                        />
                    </View>
                    <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                        Endereço
                    </Texto>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>CEP</Texto>
                        <Controller
                            control={control}
                            name="cep"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => logradouroInputRef.current?.focus()}
                                    forwardRef={cepInputRef}
                                    textContentType="postalCode"
                                    keyboardType="numeric"
                                    value={value}
                                    mascara="cep"
                                    onChangeText={onChange}
                                    placeholder="01310-200"
                                    maxLength={9}
                                    erro={errors?.cep?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Logradouro</Texto>
                            <Controller
                                control={control}
                                name="logradouro"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => numeroInputRef.current?.focus()}
                                        forwardRef={logradouroInputRef}
                                        textContentType="streetAddressLine1"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="Nome da rua ou avenida"
                                        desativado={!cepPreenchido}
                                        erro={errors?.logradouro?.message}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Número</Texto>
                            <Controller
                                control={control}
                                name="numero"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => complementoInputRef.current?.focus()}
                                        forwardRef={numeroInputRef}
                                        keyboardType="numeric"
                                        value={value?.toString() || ""}
                                        onChangeText={(texto) => {
                                            const numero = parseInt(texto) || 0;
                                            onChange(numero);
                                        }}
                                        placeholder="26"
                                        desativado={!cepPreenchido}
                                        erro={errors?.numero?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Complemento</Texto>
                        <Controller
                            control={control}
                            name="complemento"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="home" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => bairroInputRef.current?.focus()}
                                    forwardRef={complementoInputRef}
                                    textContentType="streetAddressLine2"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Bloco, portão, quadra, etc."
                                    desativado={!cepPreenchido}
                                    erro={errors?.complemento?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Bairro</Texto>
                        <Controller
                            control={control}
                            name="bairro"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => cidadeInputRef.current?.focus()}
                                    forwardRef={bairroInputRef}
                                    textContentType="sublocality"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Bela Vista"
                                    desativado={!cepPreenchido}
                                    erro={errors?.bairro?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Cidade</Texto>
                            <Controller
                                control={control}
                                name="cidade"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => ufInputRef.current?.focus()}
                                        forwardRef={cidadeInputRef}
                                        textContentType="addressCity"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="São Paulo"
                                        desativado={!cepPreenchido}
                                        erro={errors?.cidade?.message}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Estado</Texto>
                            <Controller
                                control={control}
                                name="uf"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="done"
                                        blurOnSubmit={true}
                                        onSubmitEditing={handleSubmit(proximo)}
                                        forwardRef={ufInputRef}
                                        textContentType="addressState"
                                        autoCapitalize="characters"
                                        autoCorrect={false}
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="SP"
                                        desativado={!cepPreenchido}
                                        erro={errors?.uf?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao
                    titulo={"Próxima etapa"}
                    icone="arrow-right"
                    onPress={handleSubmit(proximo)}
                    disabled={!isValid || carregando}
                />
            </View>
        </View>
    );
}