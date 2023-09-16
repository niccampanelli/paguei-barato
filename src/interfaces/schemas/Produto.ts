import * as yup from "yup";
import Produto from "../models/Produto";

const produtoSchema: yup.ObjectSchema<Produto> = yup.object().shape({
    id: yup
        .number(),
    nome: yup
        .string()
        .required("Informe o nome")
        .defined(),
    marca: yup
        .string()
        .required("Informe a marca")
        .defined(),
    tamanho: yup
        .string()
        .required("Informe um tamanho, quantidade ou volume")
        .defined(),
    cor: yup
        .string(),
    categoriaId: yup
        .number()
        .required("Informe a categoria")
        .integer("Informe um número inteiro")
        .defined(),
    categoria: yup.object().shape({
        id: yup
            .number(),
        nome: yup
            .string()
            .required("Informe o nome")
            .defined(),
        descricao: yup
            .string()
            .required("Esta categoria ainda não está cadastrada. Informe a descrição para cadastrá-la")
            .min(15, "Informe uma descrição mais detalhada")
            .defined()
    }),
    criadoPor: yup
        .number()
        .required("Informe o usuário que está cadastrando o produto")
        .integer("Informe um número inteiro")
        .defined()
});

export default produtoSchema;