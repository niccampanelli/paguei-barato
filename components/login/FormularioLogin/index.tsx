import { Botao, CampoControle } from "@/components/shared";
import { tema } from "@/constants/tema";
import { LoginSchema } from "@/schemas/login";
import { FormularioLoginProps } from "@/types/components/login/FormularioLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";

export default function FormularioLogin({
    aoSubmeter,
    aoSubmeterInvalido,
}: FormularioLoginProps) {

    const router = useRouter();

    const senhaCampoRef = useRef<TextInput>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
            isValid,
            isDirty,
        }
    } = useForm<LoginSchema>({
        defaultValues: {
            email: "",
            senha: ""
        },
        mode: "onBlur",
        resolver: zodResolver(LoginSchema),
        reValidateMode: "onChange",
    });

    async function aoSubmeterFormulario(dados: LoginSchema) {
        await aoSubmeter(dados);
        reset({});
    }

    async function aoSubmeterFormularioInvalido(erros: FieldErrors<LoginSchema>) {
        await aoSubmeterInvalido?.(erros);
        reset({});
    }

    return (
        <View style={estilos.container}>
            <CampoControle
                name="email"
                control={control}
                CampoProps={{
                    proximo: senhaCampoRef,
                    placeholder: "Escreva o seu e-mail",
                    iconeNome: "at-sign",
                }}
            />
            <CampoControle
                name="senha"
                control={control}
                CampoProps={{
                    ref: senhaCampoRef,
                    secureTextEntry: true,
                    placeholder: "Insira a sua senha",
                    iconeNome: "lock",
                }}
            />
            <View style={estilos.acoesPrincipais}>
                <Botao
                    variante="info"
                    style={{ flex: 1 }}
                    onPress={() => router.push("/(desprotegidas)/cadastro/comeco")}
                >
                    Cadastre-se
                </Botao>
                <Botao
                    variante="destaque"
                    style={{ flex: 2 }}
                    disabled={!isValid || !isDirty || isSubmitting}
                    onPress={handleSubmit(aoSubmeterFormulario, aoSubmeterFormularioInvalido)}
                    iconeNome="log-in"
                >
                    Entrar com sua conta
                </Botao>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: tema.layout.espacamentos.medio,
    },
    acoesPrincipais: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: tema.layout.espacamentos.grande,
    }
});