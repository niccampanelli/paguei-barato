import { Botao, Caixa, CaixaScroll, CampoControle, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { Passo3SenhaSchema } from "@/schemas/cadastro";
import { setPasso3Senha } from "@/store/cadastro/cadastroSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";

export default function Passo3Senha() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const senhaConfirmaCampoRef = useRef<TextInput>(null);

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            isDirty,
        }
    } = useForm<Passo3SenhaSchema>({
        defaultValues: {
            senha: "",
            senhaConfirma: "",
        },
        mode: "onBlur",
        resolver: zodResolver(Passo3SenhaSchema),
        reValidateMode: "onChange",
    });

    function aoVoltar() {
        router.back();
    }

    function aoAvancar(dados: Passo3SenhaSchema) {
        dispatch(setPasso3Senha(dados));
        router.navigate("/(desprotegidas)/cadastro/passo4Endereco");
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
                    Proteja seu cadastro
                </Texto>
                <Texto variante="texto">
                    Crie uma senha forte para garantir que somente você conseguirá acessar sua conta.
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={{ flex: 1 }}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="senha"
                    control={control}
                    CampoProps={{
                        proximo: senhaConfirmaCampoRef,
                        placeholder: "Crie uma senha",
                        ajuda: "Inclua ao menos um dígito, uma letra maiúscula, uma letra minúscula e um caractere especial.",
                        iconeNome: "lock",
                        autoComplete: "new-password",
                        secureTextEntry: true,
                    }}
                />
                <CampoControle
                    name="senhaConfirma"
                    control={control}
                    CampoProps={{
                        ref: senhaConfirmaCampoRef,
                        placeholder: "Confirme a senha",
                        iconeNome: "check",
                        secureTextEntry: true,
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