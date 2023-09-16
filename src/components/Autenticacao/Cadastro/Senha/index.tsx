import { Controller } from "react-hook-form";
import { GestureResponderEvent, KeyboardAvoidingView, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FluxoCadastroParams } from "..";
import Logo from "../../../Logo";
import Texto from "../../../Texto";
import Input from "../../../Input";
import { Feather } from "@expo/vector-icons";
import Botao from "../../../Botao";
import { useEstilos } from "../styles";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import { useEffect, useRef, useState } from "react";
import { useCadastroContext } from "../../../../util/context/providers/cadastroProvider";

type EtapaSenhaProps = NativeStackScreenProps<FluxoCadastroParams, "etapaSenha">;

export default function EtapaSenha({ navigation, route }: EtapaSenhaProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { control, errors, etapaSenhaValida } = useCadastroContext();

    const confirmaSenhaRef = useRef<TextInput>(null);

    const proximo = (e: GestureResponderEvent) => {
        e.preventDefault();
        if (!etapaSenhaValida) return;

        navigation.navigate("etapaCep");
    };

    return (
        <KeyboardAvoidingView style={estilos.container}>
            <Logo style={estilos.logo} />
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Proteja seu cadastro</Texto>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Crie uma senha para fazer login no app:</Texto>
                        <Texto style={[estiloGlobal.label, estilos.label]}>A senha deve possuir no mínimo 8 dígitos, letras maíusculas e minúsculas, números e simbolos.</Texto>
                        <Controller
                            name="senha"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    onSubmitEditing={() => confirmaSenhaRef.current?.focus()}
                                    blurOnSubmit={false}
                                    textContentType="newPassword"
                                    secureTextEntry
                                    autoCorrect={false}
                                    placeholder="Crie uma senha"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.senha?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Digite novamente sua senha:</Texto>
                        <Controller
                            name="senhaConfirma"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    forwardRef={confirmaSenhaRef}
                                    onSubmitEditing={e => proximo(e as any)}
                                    textContentType="password"
                                    secureTextEntry
                                    autoCorrect={false}
                                    placeholder="Confirme sua senha"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.senhaConfirma?.message}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <Botao disabled={!etapaSenhaValida} titulo="Próxima etapa" icone="arrow-right" onPress={proximo} />
        </KeyboardAvoidingView>
    );
};