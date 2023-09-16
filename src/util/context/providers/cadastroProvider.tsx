import { createContext, useContext, useEffect, useState } from "react";
import { ContextCadastro } from "../../../interfaces/context/ContextCadastro";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cadastroSchema from "../../../interfaces/schemas/Cadastro";
import CadastroInterface from "../../../interfaces/models/Cadastro";
import { useAuthContext } from "./authProvider";
import { useNotificacaoToast } from "./notificacaoProvider";

const CadastroContext = createContext<ContextCadastro>({
    control: undefined,
    isValid: undefined,
    errors: undefined,
    finalizarCadastro: async () => { },
    getValues: undefined,
    setValue: undefined,
    mostraBanner: true,
    setMostraBanner: () => { },
    etapaNomeValida: false,
});

const valoresIniciais: CadastroInterface = {
    nome: "",
    email: "",
    senha: "",
    senhaConfirma: "",
    cep: "",
    logradouro: "",
    numero: 0,
    complemento: undefined,
    bairro: "",
    cidade: "",
    uf: "AC"
};

export default function CadastroProvider(props: any) {

    const [mostraBanner, setMostraBanner] = useState<boolean>(true);
    const [etapaNomeValida, setEtapaNomeValida] = useState<boolean>(false);
    const [etapaEmailValida, setEtapaEmailValida] = useState<boolean>(false);
    const [etapaSenhaValida, setEtapaSenhaValida] = useState<boolean>(false);
    const [etapaCepValida, setEtapaCepValida] = useState<boolean>(false);
    const [etapaEnderecoValida, setEtapaEnderecoValida] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { isValid, errors },
        watch,
        reset
    } = useForm({
        resolver: yupResolver(cadastroSchema),
        mode: "all",
        defaultValues: valoresIniciais
    });

    const { cadastrarUsuario } = useAuthContext();
    const { notificar } = useNotificacaoToast();

    const finalizarCadastro = async (cadastro: CadastroInterface) => {
        try {
            await cadastrarUsuario(cadastro);
        }
        catch (erro) {
            notificar({
                estilo: "vermelho",
                texto: `Erro ao finalizar o cadastro: ${erro}`,
                icone: "x-circle",
                autoDispensar: true,
                dispensavel: true
            });
            throw erro;
        }
        finally {
            reset({...valoresIniciais, nome: cadastro.nome});
        }
    };

    const verificarValidadeEtapaNome = () => {
        setEtapaNomeValida(!!control?.getFieldState("nome").isDirty && !errors?.nome);
    };

    const verificarValidadeEtapaEmail = () => {
        setEtapaEmailValida(!!control?.getFieldState("email").isDirty && !errors?.email);
    };

    const verificarValidadeEtapaSenha = () => {
        setEtapaSenhaValida(
            !!control?.getFieldState("senha").isDirty &&
            !!control?.getFieldState("senhaConfirma").isDirty &&
            !errors?.senha &&
            !errors?.senhaConfirma
        );
    };

    const verificarValidadeEtapaCep = () => {
        setEtapaCepValida(!!control?.getFieldState("cep").isDirty && !errors?.cep);
    };

    const verificarValidadeEtapaEndereco = () => {
        setEtapaEnderecoValida(
            !!control?.getFieldState("logradouro").isDirty &&
            !!control?.getFieldState("numero").isDirty &&
            !!control?.getFieldState("bairro").isDirty &&
            !!control?.getFieldState("cidade").isDirty &&
            !!control?.getFieldState("uf").isDirty &&
            !errors?.logradouro &&
            !errors?.numero &&
            !errors?.bairro &&
            !errors?.cidade &&
            !errors?.uf
        );
    };

    useEffect(() => {
        verificarValidadeEtapaNome();
    }, [watch("nome")]);

    useEffect(() => {
        verificarValidadeEtapaEmail();
    }, [watch("email")]);

    useEffect(() => {
        verificarValidadeEtapaSenha();
    }, [watch("senha"), watch("senhaConfirma")]);

    useEffect(() => {
        verificarValidadeEtapaCep();
    }, [watch("cep")]);

    useEffect(() => {
        verificarValidadeEtapaEndereco();
    }, [watch("logradouro"), watch("numero"), watch("bairro"), watch("cidade"), watch("uf")]);

    return (
        <CadastroContext.Provider value={{
            control,
            isValid,
            errors,
            finalizarCadastro: handleSubmit(finalizarCadastro),
            getValues,
            setValue,
            mostraBanner,
            setMostraBanner,
            etapaNomeValida,
            etapaEmailValida,
            etapaSenhaValida,
            etapaCepValida,
            etapaEnderecoValida,
            verificarValidadeEtapaNome,
            verificarValidadeEtapaEmail,
            verificarValidadeEtapaSenha,
            verificarValidadeEtapaCep,
            verificarValidadeEtapaEndereco
        }}>
            {props.children}
        </CadastroContext.Provider>
    );
}

export const useCadastroContext = () => useContext(CadastroContext);