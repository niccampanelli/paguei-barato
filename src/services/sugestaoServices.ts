import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Sugestao from "../interfaces/models/Sugestao";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";
import estoqueServices from "./estoqueServices";

interface GetSugestaoParams {
    filtros?: Sugestao,
    ordenado?: ParametrosOrdem<Sugestao>
}

interface GetSugestaoPaginadoParams {
    filtros?: Sugestao,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Sugestao>
}

// type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
//     T extends GetSugestaoParams ?
//     Promise<AxiosResponse<Sugestao[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const sugestaoServices = {
    async getSugestoes(params?: GetSugestaoParams): Promise<AxiosResponse<Sugestao[]>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Sugestao[]>("/sugestao");
        const sugestoes = data.data || [];

        for(let i = 0; i < sugestoes.length; i++) {
            sugestoes[i] = await this.buscarRelacoesSugestao(sugestoes[i]);
        };

        return data;
    },

    async getSugestoesPaginado(params?: GetSugestaoPaginadoParams): Promise<AxiosResponse<ResponsePagina<Sugestao>>> {
        const api = await API.obterInstanciaAxios();
        
        const data = await api.get<ResponsePagina<Sugestao>>("/sugestao", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
        const sugestoes = data.data.itens;

        for(let i = 0; i < sugestoes.length; i++) {
            sugestoes[i] = await this.buscarRelacoesSugestao(sugestoes[i]);
        };

        return data;
    },

    async getSugestao(id: number): Promise<AxiosResponse<Sugestao>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Sugestao>(`/sugestao/${id}`);
        const sugestao = data.data;

        data.data = await this.buscarRelacoesSugestao(sugestao);        

        return data;
    },

    async buscarRelacoesSugestao(sugestao: Sugestao): Promise<Sugestao> {
        const estoqueIdSugestao = sugestao.estoqueId;
        const estoqueSugestao = sugestao.estoque;

        if(!estoqueSugestao && typeof estoqueIdSugestao === "number") {
            const estoque = await estoqueServices.getEstoque(estoqueIdSugestao);
            sugestao.estoque = estoque.data;
        }

        return sugestao;
    }
}

export default sugestaoServices;