import * as yup from 'yup'
import Mercado from '../models/Mercado'
import UF from '../models/UF';

const mercadoSchema: yup.ObjectSchema<Mercado> = yup.object().shape({
    id: yup
        .number(),
    nome: yup
        .string()
        .required("Informe o nome")
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
        .oneOf(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
            "Informe um estado válido")
        .defined(),
    cep: yup
        .string()
        .required("Informe o CEP")
        .length(9, "Informe um CEP válido")
        .matches(/^\d{5}-\d{3}$/, "Informe um CEP válido")
        .defined(),
    ramoId: yup
        .number()
        .required("Informe o ramo")
        .integer("Informe um número inteiro")
        .defined(),
    ramo: yup.object().shape({
        id: yup
            .number(),
        nome: yup
            .string()
            .required("Informe o nome")
            .defined(),
        descricao: yup
            .string()
            .required("Este ramo ainda não está cadastrado. Informe a descrição para cadastrá-lo")
            .min(15, "Informe uma descrição mais detalhada")
            .defined()
    })
});

export default mercadoSchema;