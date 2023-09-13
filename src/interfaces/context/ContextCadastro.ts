import { Control, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form"
import Cadastro from "../models/Cadastro"
import { Dispatch, SetStateAction } from "react";

export type ContextCadastro = {
    control?: Control<Cadastro, any>;
    isValid?: boolean;
    errors?: FieldErrors<Cadastro>;
    finalizarCadastro?: () => Promise<void>;
    getValues?: UseFormGetValues<Cadastro>;
    setValue?: UseFormSetValue<Cadastro>;
    carregando?: boolean;
    mostraBanner?: boolean;
    setMostraBanner?: Dispatch<SetStateAction<boolean>>;
}