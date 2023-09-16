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
import CarregandoOverlay from "../../../CarregandoOverlay";
import { useEffect, useState } from "react";
import enderecoServices from "../../../../services/enderecoServices";
import { useCadastroContext } from "../../../../util/context/providers/cadastroProvider";

type EtapaCepProps = NativeStackScreenProps<FluxoCadastroParams, "etapaCep">;

export default function EtapaCep({ navigation, route }: EtapaCepProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { control, errors, setValue, getValues, etapaCepValida } = useCadastroContext();

    const [carregando, setCarregando] = useState<boolean>(false);

    const obterEndereco = async () => {
        setCarregando(true);

        try {
            const { data } = await enderecoServices.getEnderecoViaCep(getValues!().cep);

            if (data.logradouro) {
                setValue!("logradouro", data.logradouro, { shouldDirty: true });
                setValue!("bairro", data.bairro, { shouldDirty: true });
                setValue!("cidade", data.localidade, { shouldDirty: true });
                setValue!("uf", data.uf, { shouldDirty: true });
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setCarregando(false);
        }
    };

    const proximo = async (e: GestureResponderEvent) => {
        e.preventDefault();
        if (!etapaCepValida) return;

        await obterEndereco();

        navigation.navigate("etapaEndereco");
    };

    return (
        <KeyboardAvoidingView style={estilos.container}>
            {carregando &&
                <CarregandoOverlay />
            }
            <Logo style={estilos.logo} />
            <View style={estilos.cadastro}>
                <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Não precisa ir muito longe!</Texto>
                <View style={estilos.form}>
                    <View style={estilos.grupoForm}>
                        <Texto style={[estiloGlobal.label, estilos.label]}>Com base no seu endereço, te recomendaremos os melhores preços e ofertas em lojas, mercados e farmácias pertinho de você.</Texto>
                        <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Nos informe seu CEP:</Texto>
                        <Controller
                            name="cep"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    onSubmitEditing={e => proximo(e as any)}
                                    keyboardType="numeric"
                                    textContentType="postalCode"
                                    placeholder="CEP"
                                    value={value}
                                    mascara="cep"
                                    onChangeText={onChange}
                                    maxLength={9}
                                    erro={errors?.cep?.message}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <Botao disabled={!etapaCepValida} titulo="Próxima etapa" icone="arrow-right" onPress={proximo} />
        </KeyboardAvoidingView>
    );
};