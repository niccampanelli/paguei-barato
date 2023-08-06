import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import Texto from '../../../../Texto';
import Input from '../../../../Input';
import Botao from '../../../../Botao';
import { useEstilos } from './styles';
import { useEstiloGlobal } from '../../../../../estiloGlobal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FluxoCriarProdutoParams } from '..';
import Produto from '../../../../../interfaces/models/Produto';

type InformacoesProps = NativeStackScreenProps<FluxoCriarProdutoParams, "informacoes">;

export default function EtapaInformacoes({ navigation, route }: InformacoesProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const [produto, setProduto] = useState<Produto>({});

    const nomeInputRef = useRef<TextInput>(null);
    const marcaInputRef = useRef<TextInput>(null);
    const tamanhoInputRef = useRef<TextInput>(null);
    const corInputRef = useRef<TextInput>(null);

    const proximo = () => {
        navigation.navigate("imagens", { produto });
    }

    return (
        <View style={estilos.main}>
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
                        <Input
                            icone={<Feather name="tag" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => nomeInputRef.current?.focus()}
                            textContentType="none"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={produto?.categoria?.nome}
                            onChangeText={(texto) => setProduto({ ...produto, categoria: { nome: texto } })}
                            placeholder="Hortifruti"
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Nome</Texto>
                        <Input
                            icone={<Feather name="shopping-bag" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => marcaInputRef.current?.focus()}
                            forwardRef={nomeInputRef}
                            textContentType="givenName"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={produto?.nome}
                            onChangeText={(texto) => setProduto({ ...produto, nome: texto })}
                            placeholder="Molho De Tomate"
                        />
                    </View>
                    <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                        Detalhes do produto
                    </Texto>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Marca</Texto>
                        <Input
                            icone={<Feather name="award" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => tamanhoInputRef.current?.focus()}
                            forwardRef={marcaInputRef}
                            textContentType="none"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={produto?.marca}
                            onChangeText={(texto) => setProduto({ ...produto, marca: texto })}
                            placeholder="BomDemais"
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Tamanho, peso ou quantidade</Texto>
                        <Input
                            icone={<Feather name="minimize-2" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => corInputRef.current?.focus()}
                            forwardRef={tamanhoInputRef}
                            textContentType="none"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={produto?.tamanho}
                            onChangeText={(texto) => setProduto({ ...produto, tamanho: texto })}
                            placeholder="250g"
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Cor, sabor ou variação</Texto>
                        <Input
                            icone={<Feather name="coffee" style={estiloGlobal.inputIcone} />}
                            returnKeyType="done"
                            onSubmitEditing={proximo}
                            forwardRef={corInputRef}
                            blurOnSubmit={true}
                            textContentType="none"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={produto?.cor}
                            onChangeText={(texto) => setProduto({ ...produto, cor: texto })}
                            placeholder="Bolonhesa"
                        />
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