import { Controller } from "react-hook-form";
import { GestureResponderEvent, KeyboardAvoidingView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FluxoCadastroParams } from "..";
import Logo from "../../../Logo";
import Texto from "../../../Texto";
import Input from "../../../Input";
import { Feather } from "@expo/vector-icons";
import Botao from "../../../Botao";
import { useEstilos } from "../styles";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import { useCadastroContext } from "../../../../util/context/providers/cadastroProvider";

type EtapaEmailProps = NativeStackScreenProps<FluxoCadastroParams, "etapaEmail">;

export default function EtapaEmail({ navigation, route }: EtapaEmailProps) {
    
    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { control, errors } = useCadastroContext();

    const proximo = (e: GestureResponderEvent) => {
        e.preventDefault();

        navigation.navigate("etapaSenha");
    };

    return (
        <KeyboardAvoidingView style={estilos.container}>
            <Logo style={estilos.logo} />
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Como podemos entrar em contato?</Texto>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Informe seu endereço de e-mail:</Texto>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="at-sign" style={estiloGlobal.inputIcone} />}
                                    keyboardType="email-address"
                                    onSubmitEditing={e => proximo(e as any)}
                                    textContentType="emailAddress"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Endereço de e-mail"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.email?.message}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <Botao titulo="Próxima etapa" icone="arrow-right" onPress={proximo} />
        </KeyboardAvoidingView>
    );
};