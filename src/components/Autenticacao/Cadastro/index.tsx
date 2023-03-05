import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, Image, KeyboardAvoidingView,  TouchableOpacity, View, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Input from "../../Input";
import { useEstilos } from "./styles";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import Texto from "../../Texto";
import Botao from "../../Botao";

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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Para começar, nos diga seu primeiro nome:</Texto>
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
                <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Agora nos diga seu sobrenome:</Texto>
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
                <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Como podemos entrar em contato?</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Informe seu endereço de e-mail:</Texto>
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
                <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Proteja seu cadastro</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Crie uma senha para fazer login no app:</Texto>
                            <Texto style={[estiloGlobal.label, estilos.label]}>A senha deve possuir no mínimo 8 dígitos, letras maíusculas e minúsculas, números e simbolos.</Texto>
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
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Digite novamente sua senha:</Texto>
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
                <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Não precisa ir muito longe!</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto style={[estiloGlobal.label, estilos.label]}>Preencha nos campos a seguir o seu endereço para recomendarmos os melhores preços e ofertas nas lojas próximas de você.</Texto>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Nos informe seu CEP:</Texto>
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
                <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Este é seu endereço?</Texto>
                    <View style={estilos.form}>
                        <View style={estilos.grupoForm}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Logradouro</Texto>
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
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Bairro</Texto>
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
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Cidade</Texto>
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
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Estado</Texto>
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
                <Botao titulo="Finalizar cadastro" icone="check-circle" onPress={e => proximo(e)}/>
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
                    <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>Tudo pronto!</Texto>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Prazer em te conhecer, Nicholas!</Texto>
                    <Texto style={[estiloGlobal.label, estilos.label]}>Seu cadastro está concluído. Agora você pode cadastrar mercados e produtos e informar os preços que você encontrar.</Texto>
                    <Texto style={[estiloGlobal.label, estilos.label]}>Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.</Texto>
                </View>
                <Botao titulo="Comece à economizar!" icone="arrow-right" onPress={e => proximo(e)}/>
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