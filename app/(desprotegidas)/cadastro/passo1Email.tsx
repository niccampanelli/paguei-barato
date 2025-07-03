import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import CampoControle from "@/components/Campo/CampoControle";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Passo1EmailSchema } from "@/schemas/cadastro";
import { selectCadastro, setPasso1Email } from "@/store/slices/cadastro";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Passo1Email() {

    const dispatch = useAppDispatch();
    const passoDados = useAppSelector(selectCadastro);

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

    function aoAvancar(dados: Passo1EmailSchema) {
        dispatch(setPasso1Email(dados));
    }

    function teste() {
        console.log(passoDados);
    }

    return (
        <View style={estilos.container}>
            <Caixa
                tamanho="grande"
                style={{ paddingBottom: 0 }}
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
                        placeholder: "Escreva o seu e-mail",
                        iconeNome: "at-sign",
                    }}
                />
                <CampoControle
                    name="emailConfirma"
                    control={control}
                    CampoProps={{
                        placeholder: "Escreva o seu e-mail",
                        iconeNome: "at-sign",
                    }}
                />
            </CaixaScroll>
            <Caixa
                tamanho="grande"
                style={{ paddingTop: 0 }}
            >
                <Botao
                    variante="destaque"
                    onPress={handleSubmit(aoAvancar, console.error)}
                >
                    Próxima etapa
                </Botao>
                <Botao
                    variante="destaque"
                    onPress={teste}
                >
                    teste
                </Botao>
            </Caixa>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: tema.layout.espacamentos.grande,
    },
    formulario: {
        flex: 1,
        rowGap: tema.layout.espacamentos.grande,
    },
    conteudo: {
        rowGap: tema.layout.espacamentos.medio,
        paddingVertical: 0,
    },
});