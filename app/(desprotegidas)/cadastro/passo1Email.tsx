import { Botao, Caixa, CaixaScroll, CampoControle, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { Passo1EmailSchema, Passo1EmailSchemaType } from "@/schemas/cadastro";
import { setPasso1Email } from "@/store/cadastro/cadastroSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";

export default function Passo1Email() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const emailConfirmaCampoRef = useRef<TextInput>(null);

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            isDirty,
        }
    } = useForm<Passo1EmailSchemaType>({
        defaultValues: {
            email: "",
            emailConfirma: "",
        },
        mode: "onBlur",
        resolver: zodResolver(Passo1EmailSchema),
        reValidateMode: "onChange",
    });

    function aoVoltar() {
        router.back();
    }

    function aoAvancar(dados: Passo1EmailSchemaType) {
        dispatch(setPasso1Email(dados));
        router.navigate("/(desprotegidas)/cadastro/passo2Nome");
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
        >
            <Caixa
                tamanho="grande"
                style={estilos.titulo}
            >
                <Texto variante="subtitulo">
                    Qual endereço de e-mail você mais usa?
                </Texto>
                <Texto variante="texto">
                    Em qual e-mail você gostaria que entrássemos em contato?
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={{ flex: 1 }}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="email"
                    control={control}
                    CampoProps={{
                        proximo: emailConfirmaCampoRef,
                        placeholder: "Informe um e-mail para contato",
                        iconeNome: "at-sign",
                        autoComplete: "email",
                        keyboardType: "email-address",
                    }}
                />
                <CampoControle
                    name="emailConfirma"
                    control={control}
                    CampoProps={{
                        ref: emailConfirmaCampoRef,
                        placeholder: "Escreva novamente o e-mail",
                        iconeNome: "check",
                        autoComplete: "email",
                        keyboardType: "email-address",
                    }}
                />
            </CaixaScroll>
            <Caixa
                tamanho="grande"
                style={estilos.rodape}
            >
                <Botao
                    variante="info"
                    onPress={aoVoltar}
                    iconeNome="arrow-left"
                    iconeLado="esquerda"
                >
                    Voltar
                </Botao>
                <Botao
                    variante="destaque"
                    disabled={!isDirty || !isValid}
                    onPress={handleSubmit(aoAvancar, console.error)}
                    style={{ flex: 1 }}
                    iconeNome="arrow-right"
                >
                    Próxima etapa
                </Botao>
            </Caixa>
        </KeyboardAvoidingView>
    )
}

const estilos = StyleSheet.create({
    titulo: {
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.medio,
    },
    conteudo: {
        rowGap: tema.layout.espacamentos.medio,
        paddingVertical: 0,
    },
    rodape: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
    },
});