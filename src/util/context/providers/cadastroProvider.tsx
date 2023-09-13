import { createContext, useContext, useState } from "react";
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
    carregando: false,
    mostraBanner: true,
    setMostraBanner: () => { }
});

export default function CadastroProvider(props: any) {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [mostraBanner, setMostraBanner] = useState<boolean>(true);

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { isValid, errors },
    } = useForm({
        resolver: yupResolver(cadastroSchema),
        mode: "onChange"
    });

    const { cadastrarUsuario } = useAuthContext();
    const { notificar } = useNotificacaoToast();

    const finalizarCadastro = async (cadastro: CadastroInterface) => {
        setCarregando(true);

        try {
            await cadastrarUsuario(cadastro);
        }
        catch (erro) {
            notificar({
                estilo: "vermelho",
                texto: `Erro ao finalizar o cadastro: ${erro}`,
                autoDispensar: true,
                dispensavel: true
            });
        }
        finally {
            setCarregando(false);
        }
    };

    return (
        <CadastroContext.Provider value={{
            control,
            isValid,
            errors,
            finalizarCadastro: handleSubmit(finalizarCadastro),
            getValues,
            setValue,
            carregando,
            mostraBanner,
            setMostraBanner
        }}>
            {props.children}
        </CadastroContext.Provider>
    );
}

export const useCadastroContext = () => useContext(CadastroContext);