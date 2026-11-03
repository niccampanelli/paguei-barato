import { Botao, Caixa, CaixaScroll, Campo, CampoControle, Texto } from "@/components/shared";
import { useAuthContext } from "@/context/auth/authContext";
import { definirIntencaoDeAutenticacao } from "@/services/authIntent";
import { tema } from "@/constants/tema";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { UsuarioSchema, UsuarioSchemaType } from "@/schemas/usuario";
import { selectUsuario } from "@/store/usuario/usuarioSlice";
import { retificar } from "@/store/usuario/usuarioThunks";
import { criarAlerta } from "@/store/alerta/alertaThunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Usuario() {

    const router = useRouter();
    const { status } = useAuthContext();

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
    } = useForm<UsuarioSchemaType>({
        defaultValues: {
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            cep: usuario.cep,
        },
        mode: "onBlur",
        resolver: zodResolver(UsuarioSchema),
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (status === "nao_autenticado") {
            definirIntencaoDeAutenticacao("/(protegidas)/(abas)/(menu)/usuario");
            router.replace("/(desprotegidas)/login");
        }
    }, [router, status]);

    if (status !== "autenticado")
        return null;

    async function aoSubmeter(dados: UsuarioSchemaType) {
        try {
            await dispatch(retificar(dados)).unwrap();
            reset(dados);
        } catch (erro) {
            dispatch(criarAlerta({
                iconeNome: "x-circle",
                variante: "vermelho",
                mensagem: typeof erro === "string"
                    ? erro
                    : "Não foi possível atualizar seus dados. Tente novamente.",
            }));
        }
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
                    Informações da sua conta
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <Texto variante="subtitulo">
                    Nome
                </Texto>
                <CampoControle
                    name="nome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um nome",
                        iconeNome: "user",
                    }}
                />
                <Texto variante="subtitulo">
                    Sobrenome
                </Texto>
                <CampoControle
                    name="sobrenome"
                    control={control}
                    CampoProps={{
                        placeholder: "Informe um sobrenome",
                        iconeNome: "user",
                    }}
                />
                <Texto variante="subtitulo">
                    Endereço de e-mail
                </Texto>
                <Campo
                    placeholder="Endereço de e-mail"
                    iconeNome="at-sign"
                    editable={false}
                    value={usuario.email}
                    ajuda="Seu e-mail é a identificação única da sua conta e não pode ser editado"
                />
                <Texto variante="subtitulo">
                    CEP
                </Texto>
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