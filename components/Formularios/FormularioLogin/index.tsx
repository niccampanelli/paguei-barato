import Botao from "@/components/Botao";
import CampoControle from "@/components/Campo/CampoControle";
import { tema } from "@/constants/tema";
import { LoginSchema } from "@/schemas/login";
import { FormularioLoginProps } from "@/types/components/Formularios/FormularioLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function FormularioLogin({
    aoSubmeter,
    aoSubmeterInvalido,
}: FormularioLoginProps) {

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: {
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

    return (
        <View style={estilos.container}>
            <CampoControle
                name="email"
                control={control}
                CampoProps={{
                    placeholder: "Escreva o seu e-mail",
                    iconeNome: "at-sign",
                }}
            />
            <CampoControle
                name="senha"
                control={control}
                CampoProps={{
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
                    disabled={!isValid || !isDirty}
                    onPress={handleSubmit(aoSubmeter, aoSubmeterInvalido)}
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