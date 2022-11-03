import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Image, KeyboardAvoidingView, Text, TouchableOpacity, View, } from "react-native";
import { Feather } from "@expo/vector-icons"; "@expo/vector-icons/Feather";
import estiloGlobal from "../../../estiloGlobal";
import Input from "../../Input";
import estilos from "./styles";
import { TextInput } from "react-native-gesture-handler";

export default function Login() {

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
                <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Que tal fazer login?</Text>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Text style={[estiloGlobal.label, estilos.label]}>E-mail</Text>
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
                        <Text style={[estiloGlobal.label, estilos.label]}>Senha</Text>
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
                            <Text style={estiloGlobal.botaoSecundarioGrandeTexto}>Cadastre-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.botaoPrincipalGrande, estilos.opcoesLoginPrincipal]}>
                            <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={estilos.opcoesLoginLabel}>ou</Text>
                    <TouchableOpacity style={estiloGlobal.botaoSecundarioGrande} onPress={e => continuarSemLogin(e)}>
                        <Text style={estiloGlobal.botaoSecundarioGrandeTexto}>Continuar sem login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}