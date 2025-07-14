import Botao from "@/components/Botao";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Campo from "@/components/Campo";
import CampoControle from "@/components/Campo/CampoControle";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { UsuarioSchema } from "@/schemas/usuario";
import { selectUsuario } from "@/store/slices/usuario";
import { retificar } from "@/store/thunks/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Usuario() {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const usuario = useAppSelector(selectUsuario);

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
            isValid,
            isDirty,
        }
    } = useForm<UsuarioSchema>({
        defaultValues: {
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            cep: usuario.cep,
        },
        mode: "onBlur",
        resolver: zodResolver(UsuarioSchema),
        reValidateMode: "onChange",
    });

    async function aoSubmeter(dados: UsuarioSchema) {
        await dispatch(retificar(dados));
        reset(dados);
    }

    function aoSubmeterInvalido() {

    }

    return (
        <View style={{ flex: 1 }}>
            <Caixa
                tamanho="grande"
                style={{ rowGap: tema.layout.espacamentos.grande }}
            >
                <View>
                    <Botao
                        variante="info"
                        tamanho="botaoPequeno"
                        iconeLado="esquerda"
                        iconeNome="arrow-left"
                        style={{ marginRight: "auto" }}
                        onPress={() => router.back()}
                    >
                        Voltar
                    </Botao>
                </View>
                <Texto variante="titulo">
                    Sua conta
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <CampoControle
                    name="nome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um nome",
                        iconeNome: "user",
                    }}
                />
                <CampoControle
                    name="sobrenome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um sobrenome",
                        iconeNome: "user",
                    }}
                />
                <Campo
                    placeholder="Endereço de e-mail"
                    iconeNome="at-sign"
                    editable={false}
                    value={usuario.email}
                />
                <CampoControle
                    name="cep"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um CEP",
                        iconeNome: "map-pin",
                    }}
                />
            </CaixaScroll>
            <Caixa
                tamanho="grande"
                style={estilos.rodape}
            >
                <Botao
                    variante="destaque"
                    style={{ flex: 2 }}
                    disabled={!isValid || !isDirty || isSubmitting}
                    onPress={handleSubmit(aoSubmeter, aoSubmeterInvalido)}
                    iconeNome="save"
                >
                    {isDirty ?
                        "Salvar edições"
                        :
                        "Nenhuma edição"
                    }
                </Botao>
            </Caixa>
        </View>
    )
}

const estilos = StyleSheet.create({
    conteudo: {
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.grande,
    },
    identificacao: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
        alignItems: "center",
    },
    item: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
        alignItems: "center",
    },
    rodape: {
        alignSelf: "baseline",
        flexDirection: "row",
        paddingBottom: 0,
    },
});