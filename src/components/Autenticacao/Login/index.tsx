import { StatusBar } from "expo-status-bar";
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, } from "react-native";
import IcoArroba from "../../../assets/Icones/IcoArroba";
import estiloGlobal from "../../../estiloGlobal";
import Input from "../../Input";
import estilos from "./styles";

export default function Login() {

    return (
        <View style={estilos.main}>
            <StatusBar hidden />
            <Image style={estilos.banner} source={require("../../../../assets/fundo_autenticacao.png")} />
            <KeyboardAvoidingView style={estilos.container}>
                <Image style={estilos.logo} resizeMode="contain" source={require("../../../../assets/logo.png")} />
                <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Que tal fazer login?</Text>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Text style={[estiloGlobal.label, estilos.label]}>E-mail</Text>
                        <Input icone={<IcoArroba />} keyboardType="email-address" returnKeyType="next" autoCapitalize="none" autoCorrect={false} placeholder="Insira seu e-mail" />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Text style={[estiloGlobal.label, estilos.label]}>Senha</Text>
                        <Input icone={<Text>asd</Text>} secureTextEntry placeholder="Digite sua senha" />
                    </View>
                </View>
                <View>
                    <View style={estilos.opcoesLoginCima}>
                        <TouchableOpacity style={estiloGlobal.botaoSecundarioGrande}>
                            <Text style={estiloGlobal.botaoSecundarioGrandeTexto}>Cadastre-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.botaoPrincipalGrande, estilos.opcoesLoginPrincipal]}>
                            <Text style={estiloGlobal.botaoPrincipalGrandeTexto}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={estilos.opcoesLoginLabel}>ou</Text>
                    <TouchableOpacity style={estiloGlobal.botaoSecundarioGrande}>
                        <Text style={estiloGlobal.botaoSecundarioGrandeTexto}>Continuar sem login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}