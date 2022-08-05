import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureResponderEvent, Image, KeyboardAvoidingView, Text, TouchableOpacity, View, } from "react-native";
import IcoArroba from "../../../assets/Icones/IcoArroba";
import estiloGlobal from "../../../estiloGlobal";
import variaveisEstilo from "../../../variaveisEstilo";
import Input from "../../Input";
import estilos from "./styles";

export default function Cadastro() {

    const navigation = useNavigation();

    const FluxoCadastro = createNativeStackNavigator();

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
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="name" autoCapitalize="words" autoCorrect={false} placeholder="Informe seu primeiro nome" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
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
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="familyName" autoCapitalize="words" autoCorrect={false} placeholder="Informe seu sobrenome" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
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
                            <Input icone={<IcoArroba />} keyboardType="email-address" textContentType="emailAddress" returnKeyType="next" autoCapitalize="none" autoCorrect={false} placeholder="Endereço de e-mail" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela4 = () => {

        const cadastroNavigation = useNavigation();

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
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="newPassword" secureTextEntry autoCorrect={false} placeholder="Crie uma senha" />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Digite novamente sua senha:</Text>
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="password" secureTextEntry autoCorrect={false} placeholder="Confirme sua senha" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
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
                            <Input icone={<IcoArroba />} returnKeyType="next" keyboardType="numeric" textContentType="postalCode" placeholder="CEP" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Próxima etapa</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela6 = () => {

        const cadastroNavigation = useNavigation();

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
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="streetAddressLine1" autoCapitalize="words" autoCorrect={true} placeholder="Nome da rua ou avenida" />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Número</Text>
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="streetAddressLine2" keyboardType="numeric" placeholder="Número" />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Bairro</Text>
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="sublocality" autoCapitalize="words" autoCorrect={true} placeholder="Bairro" />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Cidade</Text>
                            <Input icone={<IcoArroba />} returnKeyType="next" textContentType="addressCity" autoCapitalize="words" autoCorrect={true} placeholder="Cidade ou município" />
                        </View>
                        <View style={estilos.grupoForm}>
                            <Text style={[estiloGlobal.label, estilos.label]}>Estado</Text>
                            <Input icone={<IcoArroba />} returnKeyType="done" textContentType="addressState" autoCapitalize="characters" placeholder="UF" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Finalizar cadastro</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    const CadastroTela7 = ({ navigation }: NativeStackScreenProps<any>) => {

        const proximo = (e: GestureResponderEvent) => {
            e.preventDefault();
            navegarProximo(navigation, "app");
        };

        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
            return;
        })

        return (
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <View style={estilos.cadastro}>
                    <Text style={[estiloGlobal.titulo, estilos.titulo]}>Tudo pronto!</Text>
                    <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Prazer em te conhecer, Nicholas!</Text>
                    <Text style={[estiloGlobal.label, estilos.label]}>Seu cadastro está concluído. Agora você pode cadastrar mercados e produtos e informar os preços que você encontrar.</Text>
                    <Text style={[estiloGlobal.label, estilos.label]}>Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.</Text>
                </View>
                <TouchableOpacity style={estiloGlobal.botaoPrincipalGrande} onPress={e => proximo(e)}>
                    <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Comece a economizar!</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    return (
        <View style={estilos.main}>
            <StatusBar hidden />
            <Image style={estilos.banner} source={require("../../../../assets/fundo_autenticacao.png")} />
            <FluxoCadastro.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: variaveisEstilo.cores.fundoPrincipal }, animation: "slide_from_right" }}>
                <FluxoCadastro.Screen name="fluxoCadastro1" component={CadastroTela1} />
                <FluxoCadastro.Screen name="fluxoCadastro2" component={CadastroTela2} />
                <FluxoCadastro.Screen name="fluxoCadastro3" component={CadastroTela3} />
                <FluxoCadastro.Screen name="fluxoCadastro4" component={CadastroTela4} />
                <FluxoCadastro.Screen name="fluxoCadastro5" component={CadastroTela5} />
                <FluxoCadastro.Screen name="fluxoCadastro6" component={CadastroTela6} />
                <FluxoCadastro.Screen name="fluxoCadastro7" component={CadastroTela7} />
            </FluxoCadastro.Navigator>
        </View>
    );
}