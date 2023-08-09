import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Image, KeyboardAvoidingView, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons"; "@expo/vector-icons/Feather";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Input from "../../Input";
import { useEstilos } from "./styles";
import Texto from "../../Texto";
import Botao from "../../Botao";
import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";
import CarregandoOverlay from "../../CarregandoOverlay";
import Logo from "../../Logo";
import { useAuthContext } from "../../../util/context/providers/authProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackExternaRoutesParams } from "../../../StackExterna";

type LoginProps = NativeStackScreenProps<StackExternaRoutesParams, "login">;

export default function Login({ navigation, route }: LoginProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const { notificar } = useNotificacaoToast();
    const { fazerLogin } = useAuthContext();

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [carregando, setCarregando] = useState<boolean>(false);

    const inputSenhaRef = useRef<TextInput>(null);

    const cadastrar = (e: GestureResponderEvent) => {
        e.preventDefault();
        navigation.navigate("cadastro" as never);
    };
    
    const login = async () => {
        
        if (carregando) return;
        setCarregando(true);

        try {
            console.log("chamou o método na tela");
            
            await fazerLogin(email, senha);
            setTimeout(() => {
                navigation.replace("app", {} as any);
            }, 50);
        } catch (error: any) {
            notificar({
                estilo: "vermelho",
                texto: JSON.stringify(error),
                icone: "x-octagon",
                dispensavel: true,
            });
        } finally {
            setCarregando(false);
        }
    };

    const continuarSemLogin = (e: GestureResponderEvent) => {
        e.preventDefault();
        setCarregando(true);

        setTimeout(() => {
            setCarregando(false);
            navigation.navigate("app" as never);
        }, 10000);
    };

    return (
        <View style={estilos.main}>
            <StatusBar hidden />
            <Image style={estilos.banner} source={require("../../../../assets/fundo_autenticacao.png")} />
            <View style={estilos.container}>
                {carregando && <CarregandoOverlay/>}
                <Logo style={estilos.logo} />
                <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Que tal fazer login?</Texto>
                <KeyboardAvoidingView behavior="padding" style={estilos.form}>
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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Senha</Texto>
                        <Input
                            icone={<Feather name="lock" style={estiloGlobal.inputIcone}/>}
                            returnKeyType="done"
                            onSubmitEditing={login}
                            forwardRef={inputSenhaRef}
                            textContentType="password"
                            secureTextEntry
                            autoCorrect={false}
                            placeholder="Digite sua senha"
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View>
                    <View style={estilos.viewBotaoLogin}>
                        <View>
                            <Botao titulo="Cadastre-se" tipo="secundario" onPress={e => cadastrar(e)}/>
                        </View>
                        <Botao titulo="Fazer login" style={{ flex: 1 }} onPress={login}/>
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