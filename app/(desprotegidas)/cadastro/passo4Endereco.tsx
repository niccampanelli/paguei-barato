import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import CampoControle from "@/components/Campo/CampoControle";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppDispatch } from "@/hooks/store";
import { Passo4EnderecoSchema } from "@/schemas/cadastro";
import { setPasso4Endereco } from "@/store/slices/cadastro";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

export default function Passo4Endereco() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            isDirty,
        }
    } = useForm<Passo4EnderecoSchema>({
        defaultValues: {
            cep: undefined,
        },
        mode: "onBlur",
        resolver: zodResolver(Passo4EnderecoSchema),
        reValidateMode: "onChange",
    });

    function aoVoltar() {
        router.back();
    }

    function aoAvancar(dados: Passo4EnderecoSchema) {
        dispatch(setPasso4Endereco(dados));
        router.navigate("/(desprotegidas)/cadastro/fim");
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
                    Quer encontrar os melhores preços da região?
                </Texto>
                <Texto variante="texto">
                    Informe o seu CEP para que possamos recomendar preços próximos de você!
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                style={{ flex: 1 }}
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="cep"
                    control={control}
                    CampoProps={{
                        placeholder: "Digite o seu CEP",
                        iconeNome: "map-pin",
                        autoComplete: "postal-code",
                        keyboardType: "number-pad",
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
                    disabled={!isValid}
                    onPress={handleSubmit(aoAvancar, console.error)}
                    style={{ flex: 1 }}
                >
                    {isDirty
                        ? "Confirmar endereço"
                        : "Não quero informar endereço"
                    }
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