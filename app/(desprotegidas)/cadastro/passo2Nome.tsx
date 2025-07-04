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
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

export default function Passo2Nome() {

    const router = useRouter();
    const dispatch = useAppDispatch();

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
            style={estilos.container}
        >
            <Caixa
                tamanho="grande"
                style={{ paddingTop: 0 }}
            >
                <Texto variante="subtitulo">
                    Qual é o seu nome?
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={estilos.formulario}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="nome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe o primeiro nome",
                        iconeNome: "user",
                    }}
                />
                <CampoControle
                    name="sobrenome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe algum sobrenome",
                        iconeNome: "user",
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