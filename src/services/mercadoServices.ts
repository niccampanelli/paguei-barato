import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Mercado from "../interfaces/models/Mercado";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";
import ramoServices from "./ramoServices";

interface GetMercadoParams {
    filtros?: Mercado,
    ordenado?: ParametrosOrdem<Mercado>
}

interface GetMercadoPaginadoParams {
    filtros?: Mercado,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Mercado>
}

// type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
//     T extends GetSugestaoParams ?
//     Promise<AxiosResponse<Sugestao[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const mercadoServices = {
    async getMercados(params?: GetMercadoParams): Promise<AxiosResponse<Mercado[]>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Mercado[]>("/mercado", { params: { ...params?.filtros, ...params?.ordenado } });
        const mercados = data.data;

        for(let i = 0; i < mercados.length; i++) {
            mercados[i] = await mercadoServices.buscarRelacoesMercado(mercados[i]);
        };

        return data;
    },

    async getMercadosPaginado(params?: GetMercadoPaginadoParams): Promise<AxiosResponse<ResponsePagina<Mercado>>> {
        const api = await API.obterInstanciaAxios();
        
        const data = await api.get<ResponsePagina<Mercado>>("/mercado", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
        const mercados = data.data.itens;

        for(let i = 0; i < mercados.length; i++) {
            mercados[i] = await mercadoServices.buscarRelacoesMercado(mercados[i]);
        };

        return data;
    },

    async getMercado(id: number): Promise<AxiosResponse<Mercado>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Mercado>(`/mercado/${id}`);
        const mercado = data.data;

        data.data = await mercadoServices.buscarRelacoesMercado(mercado);

        return data;
    },

    async buscarRelacoesMercado(mercado: Mercado): Promise<Mercado> {
        const ramoIdMercado = mercado.ramoId;
        const ramoMercado = mercado.ramo;

        if(!ramoMercado && typeof ramoIdMercado === "number") {
            const ramo = await ramoServices.getRamo(ramoIdMercado);
            mercado.ramo = ramo.data;
        }

        return mercado;
    }
}

export default mercadoServices;