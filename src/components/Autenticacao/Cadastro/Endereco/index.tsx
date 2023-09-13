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
import { useRef } from "react";
import { useCadastroContext } from "../../../../util/context/providers/cadastroProvider";

type EtapaEnderecoProps = NativeStackScreenProps<FluxoCadastroParams, "etapaEndereco">;

export default function EtapaEndereco({ navigation, route }: EtapaEnderecoProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { control, errors, getValues } = useCadastroContext();

    const numeroInputRef = useRef<TextInput>(null);
    const complementoInputRef = useRef<TextInput>(null);
    const bairroInputRef = useRef<TextInput>(null);
    const cidadeInputRef = useRef<TextInput>(null);
    const estadoInputRef = useRef<TextInput>(null);

    const proximo = (e: GestureResponderEvent) => {
        e.preventDefault();

        navigation.navigate("etapaFinal");
    };

    return (
        <KeyboardAvoidingView style={estilos.container}>
            <Logo style={estilos.logo} />
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Este é seu endereço?</Texto>
                <View style={estilos.form}>
                    <Texto style={[estiloGlobal.label, estilos.label]}>
                        {getValues!().logradouro ?
                            "O endereço abaixo foi encontrado com base no CEP que você digitou. Confirme está tudo certo e corriga o que precisar."
                            :
                            "Não encontramos seu endereço com base no CEP que você digitou. Por favor, preencha os campos abaixo."
                        }
                    </Texto>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Logradouro</Texto>
                            <Controller
                                name="logradouro"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        onSubmitEditing={() => numeroInputRef.current?.focus()}
                                        blurOnSubmit={false}
                                        textContentType="streetAddressLine1"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        placeholder="Nome da rua ou avenida"
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.logradouro?.message}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Número</Texto>
                            <Controller
                                name="numero"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        onSubmitEditing={() => complementoInputRef.current?.focus()}
                                        forwardRef={numeroInputRef}
                                        blurOnSubmit={false}
                                        keyboardType="numeric"
                                        textContentType="streetAddressLine2"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        placeholder="Numero do imóvel"
                                        value={value?.toString() || ""}
                                        onChangeText={(texto) => {
                                            const numero = parseInt(texto) || 0;
                                            onChange(numero);
                                        }}
                                        erro={errors?.numero?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Complemento</Texto>
                        <Controller
                            name="complemento"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    onSubmitEditing={() => bairroInputRef.current?.focus()}
                                    forwardRef={complementoInputRef}
                                    blurOnSubmit={false}
                                    textContentType="streetAddressLine1"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    placeholder="Bloco, número do apartamento, portão, etc."
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.complemento?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm}>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Bairro</Texto>
                        <Controller
                            name="bairro"
                            control={control}
                            render={({ field: { onChange, value } }) => (
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
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.bairro?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoForm2}>
                        <View style={[estilos.grupoForm, { flex: 2 }]}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Cidade</Texto>
                            <Controller
                                name="cidade"
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.cidade?.message}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoForm, { flex: 1 }]}>
                            <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Estado</Texto>
                            <Controller
                                name="uf"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="done"
                                        forwardRef={estadoInputRef}
                                        onSubmitEditing={e => proximo(e as any)}
                                        textContentType="addressState"
                                        autoCapitalize="characters"
                                        placeholder="UF"
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.uf?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Botao titulo="Finalizar cadastro" icone="check-circle" onPress={proximo} />
        </KeyboardAvoidingView>
    );
};