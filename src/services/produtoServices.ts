import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Produto from "../interfaces/models/Produto";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";
import categoriaServices from "./categoriaServices";

interface GetProdutosParams {
    filtros?: Produto,
    ordenado?: ParametrosOrdem<Produto>
}

interface GetProdutosPaginadoParams {
    filtros?: Produto,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Produto>
}

// type Retorno<T extends GetProdutosParams | GetProdutosPaginadoParams> =
//     T extends GetProdutosParams ?
//     Promise<AxiosResponse<Produto[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Produto>>>;

const produtoServices = {
    async getProdutos(params?: GetProdutosParams): Promise<AxiosResponse<Produto[]>> {
        const api = await API.obterInstanciaAxios();
        
        const data = await api.get<Produto[]>("/produto", { params: { ...params?.filtros, ...params?.ordenado } });
        const produtos = data.data;

        for(let i = 0; i < produtos.length; i++) {
            produtos[i] = await this.buscarRelacoesProduto(produtos[i]);
        };

        return data;
    },

    async getProdutosPaginado(params?: GetProdutosPaginadoParams): Promise<AxiosResponse<ResponsePagina<Produto>>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<ResponsePagina<Produto>>("/produto", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
        const produtos = data.data.itens;
        
        for(let i = 0; i < produtos.length; i++) {
            produtos[i] = await this.buscarRelacoesProduto(produtos[i]);
        };

        return data;
    },

    async getProduto(id: number): Promise<AxiosResponse<Produto>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Produto>(`/produto/${id}`);
        const produto = data.data;

        data.data = await this.buscarRelacoesProduto(produto);

        return data;
    },

    async buscarRelacoesProduto(produto: Produto): Promise<Produto> {
        const categoriaIdProduto = produto.categoriaId;
        const categoriaProduto = produto.categoria;

        if(!categoriaProduto && typeof categoriaIdProduto === "number") {
            const categoria = await categoriaServices.getCategoria(categoriaIdProduto);
            produto.categoria = categoria.data;
        }

        return produto;
    },

    async criarProduto(produto: Produto): Promise<AxiosResponse<Produto>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.post<Produto>("/produto", {
            nome: produto.nome,
            marca: produto.marca,
            tamanho: produto.tamanho,
            cor: produto.cor,
            categoriaId: 1,
            criadoPor: 1
        });
        
        return data;
    },
}

export default produtoServices;