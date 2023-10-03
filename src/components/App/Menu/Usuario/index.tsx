import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackExternaRoutesParams } from "../../../../StackExterna";
import { useEstilos } from "./styles";
import Usuario from "../../../../interfaces/models/Usuario";
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Texto from "../../../Texto";
import { useEstiloGlobal } from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Modal from "../../../Modal";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEffect, useRef, useState } from "react";
import Input from "../../../Input";
import Botao from "../../../Botao";
import usuarioSchema from "../../../../interfaces/schemas/Usuario";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CarregandoOverlay from "../../../CarregandoOverlay";
import { useNotificacaoToast } from "../../../../util/context/providers/notificacaoProvider";
import authServices from "../../../../services/authServices";
import { useAuthContext } from "../../../../util/context/providers/authProvider";

export interface MenuUsuarioParams {
    usuario: Usuario
}

type MenuUsuarioProps = NativeStackScreenProps<StackExternaRoutesParams, "menuUsuario">;

export default function MenuUsuario({ navigation, route }: MenuUsuarioProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { notificar } = useNotificacaoToast();
    const { atualizarUsuarioLogado, fazerLogout } = useAuthContext();

    const [usuario, setUsuario] = useState<Usuario>(route.params?.usuario || {} as Usuario);
    const [carregando, setCarregando] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { isValid, errors, isDirty },
        getValues,
        reset
    } = useForm({
        resolver: yupResolver(usuarioSchema),
        mode: "all",
        defaultValues: usuario
    });

    const redefinirSenhaModalRef = useRef<RBSheet>(null);
    const excluirContaModalRef = useRef<RBSheet>(null);

    const obterModificacoes = () => {
        const valoresDiferentes: Partial<Usuario> = {};
        const novasInformacoes = getValues();

        for (const c in usuario) {
            const chave = c as keyof Usuario;
            if (novasInformacoes.hasOwnProperty(chave) && usuario[chave] !== novasInformacoes[chave]) {
                valoresDiferentes[chave] = novasInformacoes[chave] as any;
            }
        }

        return valoresDiferentes;
    }

    const editarInformacoes = async () => {
        setCarregando(true);

        const informacoes = obterModificacoes();

        try {
            if (!usuario.id) {
                notificar({
                    estilo: "vermelho",
                    texto: `Não foi possível editar as informações da conta: ID do usuário não encontrado.`,
                    autoDispensar: true,
                    dispensavel: true,
                    icone: "x-circle"
                });
                return;
            }

            const response = await authServices.editarUsuario(usuario.id, informacoes);

            if (response.status !== 200) {
                const data: any = response.data;
                notificar({
                    estilo: "vermelho",
                    texto: `Não foi possível editar as informações da conta: ${data.message}}`,
                    autoDispensar: true,
                    dispensavel: true,
                    icone: "x-circle"
                });
                return;
            }

            reset({
                ...usuario,
                ...informacoes
            });

            setUsuario({
                ...usuario,
                ...informacoes
            });

            atualizarUsuarioLogado({
                ...usuario,
                ...informacoes
            });

            notificar({
                estilo: "destaque",
                texto: "Informações da conta editadas com sucesso!",
                autoDispensar: true,
                dispensavel: true,
                icone: "check-circle"
            });
        }
        catch (erro: any) {
            notificar({
                estilo: "vermelho",
                texto: `Não foi possível editar as informações da conta: ${erro?.response?.data?.message || "Erro inseperado"}`,
                autoDispensar: true,
                dispensavel: true,
                icone: "x-circle"
            });
        }
        finally {
            setCarregando(false);
        }
    };

    const ExcluirModal = () => {

        const [email, setEmail] = useState<string>("");
        const [erroEmail, setErroEmail] = useState<string>("");

        useEffect(() => {
            if (!email) {
                setErroEmail("");
                return;
            }

            if (email === usuario.email) {
                setErroEmail("");
                return;
            }

            setErroEmail("Insira seu e-mail para confirmar a exclusão da conta");
        }, [email]);

        const excluirConta = async () => {
            if (email !== usuario.email)
                return;
            
            setCarregando(true);
    
            try {
                if (!usuario.id) {
                    notificar({
                        estilo: "vermelho",
                        texto: `Não foi possível excluir sua conta: ID do usuário não encontrado.`,
                        autoDispensar: true,
                        dispensavel: true,
                        icone: "x-circle"
                    });
                    return;
                }
    
                const response = await authServices.excluirUsuario(usuario.id);
    
                if (response.status !== 200) {
                    notificar({
                        estilo: "vermelho",
                        texto: `Não foi possível excluir sua conta: ${response.data.message}`,
                        autoDispensar: true,
                        dispensavel: true,
                        icone: "x-circle"
                    });
                    return;
                }
    
                notificar({
                    estilo: "destaque",
                    texto: "Conta excluída com sucesso!",
                    autoDispensar: true,
                    dispensavel: true,
                    icone: "check-circle"
                });
    
                fazerLogout();
                navigation.navigate("login");
            }
            catch (erro: any) {
                notificar({
                    estilo: "vermelho",
                    texto: `Ocorreu um erro ao excluir sua conta: ${erro?.response?.data?.message || "Erro inseperado"}`,
                    autoDispensar: true,
                    dispensavel: true,
                    icone: "x-circle"
                });
            }
            finally {
                setCarregando(false);
            }
        };

        return (
            <Modal
                titulo="Excluir conta"
                possuiBotoes
                refSheet={excluirContaModalRef}
                labelBotaoPrincipal="Confirmar e excluir."
                labelBotaoSecundario="Cancelar."
                aoPressionarBotaoPrincipal={excluirConta}
                aoPressionarBotaoSecundario={() => excluirContaModalRef.current?.close()}
                height={340}
            >
                <Texto style={[estiloGlobal.texto, { marginBottom: 16 }]}>Tem certeza que deseja excluir sua conta? Depois de excluída, não será possível recuperá-la.</Texto>
                <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Insira seu e-mail para confirmar a exclusão da conta.</Texto>
                <Input
                    icone={<Feather name="at-sign" style={estiloGlobal.inputIcone} />}
                    returnKeyType="done"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    placeholder="Confirme seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    erro={erroEmail}
                />
            </Modal>
        );
    };

    return (
        <View style={estilos.main}>
            {carregando &&
                <CarregandoOverlay />
            }
            <ExcluirModal />
            <Modal
                titulo="Redefinir senha"
                possuiBotoes
                refSheet={redefinirSenhaModalRef}
                labelBotaoPrincipal="Redefinir senha."
                labelBotaoSecundario="Cancelar."
                aoPressionarBotaoPrincipal={() => { }}
                aoPressionarBotaoSecundario={() => redefinirSenhaModalRef.current?.close()}
                height={420}
            >
                <Texto style={[estiloGlobal.texto, { marginBottom: 16 }]}>Altere a senha que você utiliza para fazer login na sua conta.</Texto>
                <View style={estilos.grupoInput}>
                    <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Insira a nova senha.</Texto>
                    <Input
                        icone={<Feather name="lock" style={[estiloGlobal.inputIcone]} />}
                        returnKeyType="done"
                        textContentType="password"
                        secureTextEntry
                        autoCorrect={false}
                        placeholder="Nova senha"
                    />
                </View>
                <View style={estilos.grupoInput}>
                    <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Confirme a nova senha.</Texto>
                    <Input
                        icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
                        returnKeyType="done"
                        textContentType="password"
                        secureTextEntry
                        autoCorrect={false}
                        placeholder="Confirme a nova senha"
                    />
                </View>
            </Modal>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" style={estiloGlobal.tagPequenaNormalTexto} />
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Texto>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={estilos.container}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={estilos.usuario}>
                        <Texto peso="900Black" style={[estiloGlobal.subtitulo, estilos.usuarioIcone]}>
                            {Formatador.obterIniciaisNome(usuario.nome)}
                        </Texto>
                        <View>
                            <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                                {usuario.nome}
                            </Texto>
                            <Texto style={estiloGlobal.observacao}>
                                {usuario.email}
                            </Texto>
                        </View>
                    </View>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, { marginBottom: 10 }]}>Informações básicas</Texto>
                    <View style={estilos.grupoInput}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Nome</Texto>
                        <Controller
                            control={control}
                            name="nome"
                            render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                <Input
                                    icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="done"
                                    textContentType="name"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    placeholder="Nome completo"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.nome?.message}
                                    destacado={isDirty}
                                />
                            )}
                        />
                    </View>
                    <View style={[estilos.grupoInput, { marginBottom: 16 }]}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>E-mail</Texto>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                <Input
                                    icone={<Feather name="at-sign" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="done"
                                    textContentType="emailAddress"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Endereço de e-mail"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.email?.message}
                                    destacado={isDirty}
                                />
                            )}
                        />
                    </View>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, { marginBottom: 10 }]}>Endereço</Texto>
                    <View style={estilos.grupoInput}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>CEP</Texto>
                        <Controller
                            control={control}
                            name="cep"
                            render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                <Input
                                    icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    textContentType="postalCode"
                                    placeholder="CEP"
                                    mascara="cep"
                                    maxLength={9}
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.cep?.message}
                                    destacado={isDirty}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoInput2}>
                        <View style={[estilos.grupoInput, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Logradouro</Texto>
                            <Controller
                                control={control}
                                name="logradouro"
                                render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        textContentType="streetAddressLine1"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        placeholder="Nome da rua ou avenida"
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.logradouro?.message}
                                        destacado={isDirty}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoInput, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Número</Texto>
                            <Controller
                                control={control}
                                name="numero"
                                render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                    <Input
                                        icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        keyboardType="numeric"
                                        placeholder="26"
                                        value={value?.toString() || ""}
                                        onChangeText={(texto) => {
                                            const numero = parseInt(texto) || 0;
                                            onChange(numero);
                                        }}
                                        erro={errors?.numero?.message}
                                        destacado={isDirty}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View style={estilos.grupoInput}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Complemento</Texto>
                        <Controller
                            control={control}
                            name="complemento"
                            render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                <Input
                                    icone={<Feather name="home" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    textContentType="streetAddressLine2"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    placeholder="Bloco, portão, quadra, etc."
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.complemento?.message}
                                    destacado={isDirty}
                                />
                            )}
                        />
                    </View>
                    <View style={estilos.grupoInput}>
                        <Texto peso="700Bold" style={estiloGlobal.label}>Bairro</Texto>
                        <Controller
                            control={control}
                            name="bairro"
                            render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                <Input
                                    icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    textContentType="sublocality"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    placeholder="Bela Vista"
                                    value={value}
                                    onChangeText={onChange}
                                    erro={errors?.bairro?.message}
                                    destacado={isDirty}
                                />
                            )}
                        />
                    </View>
                    <View style={[estilos.grupoInput2, { marginBottom: 16 }]}>
                        <View style={[estilos.grupoInput, { flex: 2 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Cidade</Texto>
                            <Controller
                                control={control}
                                name="cidade"
                                render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        textContentType="addressCity"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        placeholder="Cidade ou município"
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.cidade?.message}
                                        destacado={isDirty}
                                    />
                                )}
                            />
                        </View>
                        <View style={[estilos.grupoInput, { flex: 1 }]}>
                            <Texto peso="700Bold" style={estiloGlobal.label}>Estado</Texto>
                            <Controller
                                control={control}
                                name="uf"
                                render={({ field: { value, onChange }, fieldState: { isDirty } }) => (
                                    <Input
                                        icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
                                        returnKeyType="done"
                                        textContentType="addressState"
                                        autoCapitalize="characters"
                                        placeholder="UF"
                                        value={value}
                                        onChangeText={onChange}
                                        erro={errors?.uf?.message}
                                        destacado={isDirty}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, { marginBottom: 10 }]}>Outras opções</Texto>
                    <TouchableOpacity onPress={() => redefinirSenhaModalRef.current?.open()} style={estilos.opcao}>
                        <Feather name="lock" style={estilos.opcaoIcone} />
                        <Texto peso="700Bold" style={estilos.opcaoTexto}>Redefinir senha</Texto>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirContaModalRef.current?.open()} style={estilos.opcao}>
                        <Feather name="trash-2" style={estilos.opcaoIconeVermelho} />
                        <Texto peso="700Bold" style={estilos.opcaoTextoVermelho}>Excluir conta</Texto>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={estilos.botaoSalvarView}>
                <Botao
                    titulo={isDirty ? "Salvar modificações" : "Nenhuma modificação para salvar"}
                    icone="check-circle"
                    onPress={editarInformacoes}
                    disabled={!isDirty}
                />
            </View>
        </View>
    );
}