import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
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

type CriarSugestaoProps = NativeStackScreenProps<StackExternaRoutesParams, "criarSugestao">;

export default function CriarSugestao({ navigation, route }: CriarSugestaoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    
    const [produto, setProduto] = useState<Produto>({});
    const [mercado, setMercado] = useState<Mercado>({} as any);
    const [preco, setPreco] = useState<number>(0);

    const mercadoInputRef = useRef<TextInput>(null);
    const precoInputRef = useRef<TextInput>(null);

    return (
        <View style={estilos.main}>
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
                        <Input
                            icone={<Feather name="shopping-bag" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => mercadoInputRef.current?.focus()}
                            textContentType="none"
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={produto.nome}
                            onChangeText={(texto) => setProduto({ ...produto, nome: texto })}
                            placeholder="Molho De Tomate Tradicional 340g"
                        />
                    </View>
                    <View style={[estilos.grupoForm, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Em qual mercado se encontra o produto que irá sugerir o preço?</Texto>
                        <Input
                            icone={<Feather name="shopping-cart" style={estiloGlobal.inputIcone} />}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => precoInputRef.current?.focus()}
                            forwardRef={mercadoInputRef}
                            textContentType="givenName"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={mercado?.nome}
                            onChangeText={(texto) => setMercado({ ...mercado, nome: texto })}
                            placeholder="Minimercado MenorPreço"
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
                    titulo={"Próxima etapa"}
                    icone="arrow-right"
                />
            </View>
        </View>
    );
}