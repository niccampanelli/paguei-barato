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
import UF from '../../../../../interfaces/models/UF';
import ramoServices from '../../../../../services/ramoServices';
import Ramo from '../../../../../interfaces/models/Ramo';
import AutoComplete from '../../../../AutoComplete';

type InformacoesProps = NativeStackScreenProps<FluxoCriarMercadoParams, "informacoes">;

export default function EtapaInformacoes({ navigation, route }: InformacoesProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [ramos, setRamos] = useState<Ramo[]>([]);
    const [mercado, setMercado] = useState<Mercado>({} as any);
    const [carregando, setCarregando] = useState<boolean>(false);

    const nomeInputRef = useRef<TextInput>(null);
    const cepInputRef = useRef<TextInput>(null);
    const logradouroInputRef = useRef<TextInput>(null);
    const numeroInputRef = useRef<TextInput>(null);
    const complementoInputRef = useRef<TextInput>(null);
    const bairroInputRef = useRef<TextInput>(null);
    const cidadeInputRef = useRef<TextInput>(null);
    const ufInputRef = useRef<TextInput>(null);

    const proximo = () => {
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

    useEffect(() => {
        obterRamos();
    }, []);

    return (
        <View style={estilos.main}>
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
                        <AutoComplete
                            icone="tag"
                            returnKeyType='next'
                            blurOnSubmit={false}
                            onSubmitEditing={() => nomeInputRef.current?.focus()}
                            textContentType='givenName'
                            autoCapitalize='words'
                            autoCorrect={true}
                            placeholder="Supermercado, farmácia, padaria..."
                            extrairChave={(ramo) => ramo.nome}
                            aoSelecionar={(ramo) => setMercado({ ...mercado, ramo })}
                            dados={ramos}
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Nome</Texto>
                        <Input
                            icone={<Feather name="shopping-cart" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => cepInputRef.current?.focus()}
                            forwardRef={nomeInputRef}
                            textContentType="organizationName"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={mercado?.nome}
                            onChangeText={(texto) => setMercado({ ...mercado, nome: texto })}
                            placeholder="Nome do estabelecimento"
                        />
                    </View>
                    <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                        Endereço
                    </Texto>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>CEP</Texto>
                        <Input
                            icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => logradouroInputRef.current?.focus()}
                            forwardRef={cepInputRef}
                            textContentType="postalCode"
                            keyboardType="numeric"
                            value={mercado?.cep}
                            onChangeText={(texto) => setMercado({ ...mercado, cep: texto })}
                            placeholder="01310-200"
                            maxLength={9}
                        />
                    </View>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Logradouro</Texto>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => numeroInputRef.current?.focus()}
                                forwardRef={logradouroInputRef}
                                textContentType="streetAddressLine1"
                                autoCapitalize="words"
                                autoCorrect={true}
                                value={mercado?.logradouro}
                                onChangeText={(texto) => setMercado({ ...mercado, logradouro: texto })}
                                placeholder="Nome da rua ou avenida"
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Número</Texto>
                            <Input
                                icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => complementoInputRef.current?.focus()}
                                forwardRef={numeroInputRef}
                                keyboardType="numeric"
                                value={mercado?.numero?.toString()}
                                onChangeText={(texto) => setMercado({ ...mercado, numero: parseInt(texto) })}
                                placeholder="26"
                            />
                        </View>
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Complemento</Texto>
                        <Input
                            icone={<Feather name="home" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => bairroInputRef.current?.focus()}
                            forwardRef={complementoInputRef}
                            textContentType="streetAddressLine2"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={mercado?.complemento}
                            onChangeText={(texto) => setMercado({ ...mercado, complemento: texto })}
                            placeholder="Bloco, portão, quadra, etc."
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Bairro</Texto>
                        <Input
                            icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => cidadeInputRef.current?.focus()}
                            forwardRef={bairroInputRef}
                            textContentType="sublocality"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={mercado?.bairro}
                            onChangeText={(texto) => setMercado({ ...mercado, bairro: texto })}
                            placeholder="Bela Vista"
                        />
                    </View>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Cidade</Texto>
                            <Input
                                icone={<Feather name="map" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => ufInputRef.current?.focus()}
                                forwardRef={cidadeInputRef}
                                textContentType="addressCity"
                                autoCapitalize="words"
                                autoCorrect={true}
                                value={mercado?.cidade}
                                onChangeText={(texto) => setMercado({ ...mercado, cidade: texto })}
                                placeholder="São Paulo"
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Estado</Texto>
                            <Input
                                icone={<Feather name="map" style={estiloGlobal.inputIcone} />}
                                returnKeyType="done"
                                blurOnSubmit={true}
                                onSubmitEditing={proximo}
                                forwardRef={ufInputRef}
                                textContentType="addressState"
                                autoCapitalize="characters"
                                autoCorrect={false}
                                value={mercado?.uf}
                                onChangeText={(texto) => setMercado({ ...mercado, uf: texto as UF })}
                                placeholder="SP"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={estilos.botaoAdicionarView}>
                <Botao
                    titulo={"Próxima etapa"}
                    icone="arrow-right"
                    onPress={proximo}
                />
            </View>
        </View>
    );
}