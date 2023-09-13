import * as yup from 'yup';
import UF from '../models/UF';
import Cadastro from '../models/Cadastro';

const cadastroSchema: yup.ObjectSchema<Cadastro> = yup.object().shape({
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
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .defined(),
    senhaConfirma: yup
        .string()
        .required("Confirme a senha")
        .oneOf([yup.ref("senha")], "A confirmação deve ser igual à senha")
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
        .length(9, "Informe um CEP válido")
        .matches(/^\d{5}-\d{3}$/, "Informe um CEP válido")
        .defined()
});

export default cadastroSchema;