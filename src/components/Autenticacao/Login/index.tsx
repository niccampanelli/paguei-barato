import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Image, KeyboardAvoidingView,  TouchableOpacity, View, } from "react-native";
import { Feather } from "@expo/vector-icons"; "@expo/vector-icons/Feather";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Input from "../../Input";
import { useEstilos } from "./styles";
import { TextInput } from "react-native-gesture-handler";
import Texto from "../../Texto";

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
            <KeyboardAvoidingView behavior="padding" style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Que tal fazer login?</Texto>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
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
                    <View style={estilos.grupoForm}>
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
                </View>
                <View>
                    <View style={estilos.opcoesLoginCima}>
                        <TouchableOpacity style={estiloGlobal.botaoSecundarioGrande} onPress={e => cadastrar(e)}>
                            <Texto style={estiloGlobal.botaoSecundarioGrandeTexto}>Cadastre-se</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.botaoPrincipalGrande, estilos.opcoesLoginPrincipal]}>
                            <Texto style={estiloGlobal.botaoPrincipalGrandeTexto}>Fazer login</Texto>
                        </TouchableOpacity>
                    </View>
                    <Texto style={estilos.opcoesLoginLabel}>ou</Texto>
                    <TouchableOpacity style={estiloGlobal.botaoSecundarioGrande} onPress={e => continuarSemLogin(e)}>
                        <Texto style={estiloGlobal.botaoSecundarioGrandeTexto}>Continuar sem login</Texto>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}