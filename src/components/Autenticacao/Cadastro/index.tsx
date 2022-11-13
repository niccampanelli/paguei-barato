import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, Image, KeyboardAvoidingView, Text, TouchableOpacity, View, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Input from "../../Input";
import { useEstilos } from "./styles";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { useTemaContext } from "../../../util/context/providers/temaProvider";

export default function Cadastro() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const FluxoCadastro = createNativeStackNavigator();
    const { propriedadesTema, temaAtivo } = useTemaContext();

    const [mostraBanner, setMostraBanner] = useState(true);

    const navegarProximo = (nav: NavigationProp<any>, tela: string) => {
        nav.navigate(tela as never);
    }

    const CadastroTela1 = () => {

        const cadastroNavigation = useNavigation();

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro2");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Para começar, nos diga seu primeiro nome:</Text>
                            <Input
                                icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                onSubmitEditing={e => proximo(e as any)}
                                textContentType="name"
                                autoCapitalize="words"
                                autoCorrect={false}
                                placeholder="Informe seu primeiro nome"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela2 = () => {

        const cadastroNavigation = useNavigation();

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro3");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Agora nos diga seu sobrenome:</Text>
                            <Input
                                icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                onSubmitEditing={e => proximo(e as any)}
                                textContentType="familyName"
                                autoCapitalize="words"
                                autoCorrect={false}
                                placeholder="Informe seu sobrenome"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela3 = () => {

        const cadastroNavigation = useNavigation();

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro4");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Como podemos entrar em contato?</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Informe seu endereço de e-mail:</Text>
                            <Input
                                icone={<Feather name="at-sign" style={estiloGlobal.inputIcone} />}
                                keyboardType="email-address"
                                onSubmitEditing={e => proximo(e as any)}
                                textContentType="emailAddress"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Endereço de e-mail"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela4 = () => {

        const cadastroNavigation = useNavigation();
        const confirmaSenhaRef = useRef<TextInput>(null);

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro5");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Proteja seu cadastro</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Crie uma senha para fazer login no app:</Text>
                            <Text style={[estiloGlobal.label, estilos.label]}>A senha deve possuir no mínimo 8 dígitos, letras maíusculas e minúsculas, números e simbolos.</Text>
                            <Input
                                icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                onSubmitEditing={() => confirmaSenhaRef.current?.focus()}
                                blurOnSubmit={false}
                                textContentType="newPassword"
                                secureTextEntry
                                autoCorrect={false}
                                placeholder="Crie uma senha"
                            />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Digite novamente sua senha:</Text>
                            <Input
                                icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                forwardRef={confirmaSenhaRef}
                                onSubmitEditing={e => proximo(e as any)}
                                textContentType="password"
                                secureTextEntry
                                autoCorrect={false}
                                placeholder="Confirme sua senha"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela5 = () => {

        const cadastroNavigation = useNavigation();

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro6");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Não precisa ir muito longe!</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Preencha nos campos a seguir o seu endereço para recomendarmos os melhores preços e ofertas nas lojas próximas de você.</Text>
                            <Text style={[estiloGlobal.label, estilos.label]}>Nos informe seu CEP:</Text>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                onSubmitEditing={e => proximo(e as any)}
                                keyboardType="numeric"
                                textContentType="postalCode"
                                placeholder="CEP"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela6 = () => {

        const cadastroNavigation = useNavigation();
        const bairroInputRef = useRef<TextInput>(null);
        const cidadeInputRef = useRef<TextInput>(null);
        const estadoInputRef = useRef<TextInput>(null);

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(cadastroNavigation, "fluxoCadastro7");
        };

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Este é seu endereço?</Text>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Logradouro</Text>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                onSubmitEditing={() => bairroInputRef.current?.focus()}
                                blurOnSubmit={false}
                                textContentType="streetAddressLine1"
                                autoCapitalize="words"
                                autoCorrect={true}
                                placeholder="Nome da rua ou avenida"
                            />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Bairro</Text>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                forwardRef={bairroInputRef}
                                onSubmitEditing={() => cidadeInputRef.current?.focus()}
                                blurOnSubmit={false}
                                textContentType="sublocality"
                                autoCapitalize="words"
                                autoCorrect={true}
                                placeholder="Bairro"
                            />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Cidade</Text>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="next"
                                forwardRef={cidadeInputRef}
                                onSubmitEditing={() => estadoInputRef.current?.focus()}
                                blurOnSubmit={false}
                                textContentType="addressCity"
                                autoCapitalize="words"
                                autoCorrect={true}
                                placeholder="Cidade ou município"
                            />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Estado</Text>
                            <Input
                                icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                returnKeyType="done"
                                forwardRef={estadoInputRef}
                                onSubmitEditing={e => proximo(e as any)}
                                textContentType="addressState"
                                autoCapitalize="characters"
                                placeholder="UF"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Finalizar cadastro</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="check-circle" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela7 = () => {

        const navigation = useNavigation();

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(navigation.getParent(), "app");
        };

        useEffect(() => {
            setMostraBanner(false);

            navigation.addListener('beforeRemove', e => {
                if (e.data.action.type === "GO_BACK")
                    e.preventDefault();
                return;
            })
        }, []);

        const escalaIcone = useSharedValue(0);

        const animacaoIcone = useAnimatedStyle(() => {

            escalaIcone.value = 1;

            return {
                transform: [
                    { scale: withDelay(500, withSpring(escalaIcone.value)) }
                ]
            }
        }, []);

        return (
            <View style={estilos.containerFim}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <Animated.View style={[estilos.cadastroFim, animacaoIcone]}>
                    <Feather name="check-circle" style={estilos.cadastroFimIcone} />
                </Animated.View>
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.titulo, estilos.titulo]}>Tudo pronto!</Text>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Prazer em te conhecer, Nicholas!</Text>
                    <Text style={[estiloGlobal.label, estilos.label]}>Seu cadastro está concluído. Agora você pode cadastrar mercados e produtos e informar os preços que você encontrar.</Text>
                    <Text style={[estiloGlobal.label, estilos.label]}>Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.</Text>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Comece a economizar!</Text>
                    <Feather style={estiloGlobal.botaoPrincipalGrandeIcone} name="arrow-right" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={estilos.main}>
            {mostraBanner ?
                <>
                    <StatusBar hidden />
                    <Image style={estilos.banner} source={require("../../../../assets/fundo_cadastro.jpg")} />
                </>
                :
                <>
                    <StatusBar style={ temaAtivo === "claro" ? "dark" : "light" } backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
                </>
            }
            <FluxoCadastro.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
                <FluxoCadastro.Screen name="fluxoCadastro1" options={{ animation: "slide_from_right" }} component={CadastroTela1} />
                <FluxoCadastro.Screen name="fluxoCadastro2" options={{ animation: "slide_from_right" }} component={CadastroTela2} />
                <FluxoCadastro.Screen name="fluxoCadastro3" options={{ animation: "slide_from_right" }} component={CadastroTela3} />
                <FluxoCadastro.Screen name="fluxoCadastro4" options={{ animation: "slide_from_right" }} component={CadastroTela4} />
                <FluxoCadastro.Screen name="fluxoCadastro5" options={{ animation: "slide_from_right" }} component={CadastroTela5} />
                <FluxoCadastro.Screen name="fluxoCadastro6" options={{ animation: "slide_from_right" }} component={CadastroTela6} />
                <FluxoCadastro.Screen name="fluxoCadastro7" options={{ animation: "slide_from_bottom", gestureEnabled: false }} component={CadastroTela7} />
            </FluxoCadastro.Navigator>
        </View>
    );
}