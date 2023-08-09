import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Estoque from "../interfaces/models/Estoque";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";
import produtoServices from "./produtoServices";
import mercadoServices from "./mercadoServices";

interface GetEstoqueParams {
    filtros?: Estoque,
    ordenado?: ParametrosOrdem<Estoque>
}

interface GetEstoquePaginadoParams {
    filtros?: Estoque,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Estoque>
}

// type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
//     T extends GetSugestaoParams ?
//     Promise<AxiosResponse<Sugestao[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const estoqueServices = {
    async getEstoques(params?: GetEstoqueParams): Promise<AxiosResponse<Estoque[]>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Estoque[]>("/estoque", { params: { ...params?.filtros, ...params?.ordenado } });
        const estoques = data.data;

        for(let i = 0; i < estoques.length; i++) {
            estoques[i] = await this.buscarRelacoesEstoque(estoques[i]);
        };

        return data;
    },

    async getEstoquesPaginado(params?: GetEstoquePaginadoParams): Promise<AxiosResponse<ResponsePagina<Estoque>>> {
        const api = await API.obterInstanciaAxios();
        
        const data = await api.get<ResponsePagina<Estoque>>("/estoque", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
        const estoques = data.data.itens;

        for(let i = 0; i < estoques.length; i++) {
            estoques[i] = await this.buscarRelacoesEstoque(estoques[i]);
        };

        return data;
    },

    async getEstoque(id: number): Promise<AxiosResponse<Estoque>> {
        const api = await API.obterInstanciaAxios();
        
        const data = await api.get<Estoque>(`/estoque/${id}`);
        const estoque = data.data;

        data.data = await this.buscarRelacoesEstoque(estoque);

        return data;
    },

    async buscarRelacoesEstoque(estoque: Estoque): Promise<Estoque> {
        const produtoIdEstoque = estoque.produtoId;
        const produtoEstoque = estoque.produto;
        const mercadoIdEstoque = estoque.mercadoId;
        const mercadoEstoque = estoque.mercado;

        if(!produtoEstoque && typeof produtoIdEstoque === "number") {
            const produto = await produtoServices.getProduto(produtoIdEstoque);
            estoque.produto = produto.data;
        }

        if(!mercadoEstoque && typeof mercadoIdEstoque === "number") {
            const mercado = await mercadoServices.getMercado(mercadoIdEstoque);
            estoque.mercado = mercado.data;
        }

        return estoque;
    },
    
    async criarEstoque(produtoId: number, mercadoId: number): Promise<AxiosResponse<Estoque>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.post<Estoque>("/estoque", {
            produtoId,
            mercadoId,
            criadoPor: 1
        });
        
        return data;
    },
}

export default estoqueServices;