import * as yup from 'yup';
import Usuario from '../models/Usuario';
import UF from '../models/UF';

const usuarioSchema: yup.ObjectSchema<Usuario> = yup.object().shape({
    id: yup
        .number(),
    nome: yup
        .string()
        .required("Informe o nome")
        .defined(),
    email: yup
        .string()
        .required("Informe o email")
        .email("Informe um email válido")
        .defined(),
    senha: yup
        .string()
        .required("Informe a senha")
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .defined(),
    logradouro: yup
        .string()
        .required("Informe o logradouro")
        .defined(),
    numero: yup
        .number()
        .required("Informe o número")
        .positive("Informe um número positivo")
        .integer("Informe um número inteiro")
        .defined(),
    complemento: yup
        .string(),
    bairro: yup
        .string()
        .required("Informe o bairro")
        .defined(),
    cidade: yup
        .string()
        .required("Informe a cidade")
        .defined(),
    uf: yup
        .mixed<UF>()
        .required("Informe o estado")
        .defined(),
    cep: yup
        .string()
        .required("Informe o CEP")
        .matches(/^\d{5}-\d{3}$/, "Informe um CEP válido")
        .defined()
});

export default usuarioSchema;