import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import CampoControle from "@/components/Campo/CampoControle";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { Passo2NomeSchema } from "@/schemas/cadastro";
import { setPasso2Nome } from "@/store/slices/cadastro";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";

export default function Passo2Nome() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const sobrenomeCampoRef = useRef<TextInput>(null);

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            isDirty,
        }
    } = useForm<Passo2NomeSchema>({
        defaultValues: {
            nome: "",
            sobrenome: "",
        },
        mode: "onBlur",
        resolver: zodResolver(Passo2NomeSchema),
        reValidateMode: "onChange",
    });

    function aoVoltar() {
        router.back();
    }

    function aoAvancar(dados: Passo2NomeSchema) {
        dispatch(setPasso2Nome(dados));
        router.navigate("/(desprotegidas)/cadastro/passo3Senha");
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
                    Como a gente pode te chamar?
                </Texto>
                <Texto variante="texto">
                    Informe o seu nome para que possamos te identificar. Outros usuários não poderão ver o seu nome.
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={{ flex: 1 }}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="nome"
                    control={control}
                    CampoProps={{
                        proximo: sobrenomeCampoRef,
                        placeholder: "Diga seu primeiro nome",
                        iconeNome: "user",
                        autoComplete: "name-given",
                    }}
                />
                <CampoControle
                    name="sobrenome"
                    control={control}
                    CampoProps={{
                        ref: sobrenomeCampoRef,
                        placeholder: "Informe algum sobrenome",
                        iconeNome: "user",
                        autoComplete: "name-family",
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