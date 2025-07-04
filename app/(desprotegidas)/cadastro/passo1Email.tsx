import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import CampoControle from "@/components/Campo/CampoControle";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { Passo1EmailSchema } from "@/schemas/cadastro";
import { setPasso1Email } from "@/store/slices/cadastro";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

export default function Passo1Email() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            isDirty,
        }
    } = useForm<Passo1EmailSchema>({
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

    function aoAvancar(dados: Passo1EmailSchema) {
        dispatch(setPasso1Email(dados));
        router.navigate("/(desprotegidas)/cadastro/passo2Nome");
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={estilos.container}
        >
            <Caixa
                tamanho="grande"
                style={{ paddingTop: 0 }}
            >
                <Texto variante="subtitulo">
                    Como podemos entrar em contato com você?
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={estilos.formulario}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="email"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um e-mail",
                        iconeNome: "at-sign",
                        autoComplete: "email",
                        keyboardType: "email-address",
                        textContentType: "emailAddress",
                    }}
                />
                <CampoControle
                    name="emailConfirma"
                    control={control}
                    CampoProps={{
                        placeholder: "Escreva novamente o e-mail",
                        iconeNome: "check",
                        autoComplete: "email",
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
                >
                    Voltar
                </Botao>
                <Botao
                    variante="destaque"
                    disabled={!isDirty || !isValid}
                    onPress={handleSubmit(aoAvancar, console.error)}
                    style={{ flex: 1 }}
                >
                    Próxima etapa
                </Botao>
            </Caixa>
        </KeyboardAvoidingView>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    formulario: {
        flex: 1,
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