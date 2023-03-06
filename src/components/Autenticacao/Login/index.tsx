import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Image, KeyboardAvoidingView, View, } from "react-native";
import { Feather } from "@expo/vector-icons"; "@expo/vector-icons/Feather";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Input from "../../Input";
import { useEstilos } from "./styles";
import { TextInput } from "react-native-gesture-handler";
import Texto from "../../Texto";
import Botao from "../../Botao";

export default function Login() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const navigation = useNavigation();

    const inputSenhaRef = useRef<TextInput>(null);

    const cadastrar = (e: GestureResponderEvent) => {
        e.preventDefault();
        navigation.navigate("cadastro" as never);
    };
    
    const fazerLogin = () => {};

    const continuarSemLogin = (e: GestureResponderEvent) => {
        e.preventDefault();
        navigation.navigate("app" as never);
    };

    return (
        <View style={estilos.main}>
            <StatusBar hidden />
            <Image style={estilos.banner} source={require("../../../../assets/fundo_autenticacao.png")} />
            <View style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Que tal fazer login?</Texto>
                <KeyboardAvoidingView behavior="height" style={estilos.form}>
                    <View>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>E-mail</Texto>
                        <Input
                            icone={<Feather name="at-sign" style={estiloGlobal.inputIcone}/>}
                            keyboardType="email-address"
                            onSubmitEditing={() => inputSenhaRef.current?.focus()}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Insira seu e-mail"
                        />
                    </View>
                    <View>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Senha</Texto>
                        <Input
                            icone={<Feather name="lock" style={estiloGlobal.inputIcone}/>}
                            returnKeyType="done"
                            forwardRef={inputSenhaRef}
                            textContentType="password"
                            secureTextEntry
                            autoCorrect={false}
                            placeholder="Digite sua senha"
                        />
                    </View>
                </KeyboardAvoidingView>
                <View>
                    <View style={estilos.viewBotaoLogin}>
                        <View>
                            <Botao titulo="Cadastre-se" tipo="secundario" onPress={e => cadastrar(e)}/>
                        </View>
                        <Botao titulo="Fazer login" style={{ flex: 1 }}/>
                    </View>
                    <Texto style={estilos.opcoesLoginLabel}>ou</Texto>
                    <View style={estilos.viewBotaoLogin}>
                        <Botao titulo="Continuar sem login" tipo="secundario" style={{ flex: 1 }} onPress={e => continuarSemLogin(e)}/>
                    </View>
                </View>
            </View>
        </View>
    );
}