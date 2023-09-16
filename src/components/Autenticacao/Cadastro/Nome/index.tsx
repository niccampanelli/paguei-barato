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
import { useEffect, useState } from "react";

type EtapaNomeProps = NativeStackScreenProps<FluxoCadastroParams, "etapaNome">;

export default function EtapaNome({ navigation, route }: EtapaNomeProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { control, errors, etapaNomeValida } = useCadastroContext();

    const proximo = (e: GestureResponderEvent) => {
        e.preventDefault();
        if (!etapaNomeValida) return;

        navigation.navigate("etapaEmail");
    };

    return (
        <KeyboardAvoidingView style={estilos.container}>
            <Logo style={estilos.logo} />
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Texto>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Para começar, nos diga seu primeiro nome:</Texto>
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    onSubmitEditing={e => proximo(e as any)}
                                    textContentType="name"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    placeholder="Informe seu primeiro nome"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.nome?.message}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <Botao disabled={!etapaNomeValida} titulo="Próxima etapa" icone="arrow-right" onPress={proximo} />
        </KeyboardAvoidingView>
    );
};