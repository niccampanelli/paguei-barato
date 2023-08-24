import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Ramo from "../interfaces/models/Ramo";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";

interface GetRamoParams {
    filtros?: Ramo,
    ordenado?: ParametrosOrdem<Ramo>
}

interface GetRamoPaginadoParams {
    filtros?: Ramo,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Ramo>
}

// type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
//     T extends GetSugestaoParams ?
//     Promise<AxiosResponse<Sugestao[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const ramoServices = {
    async getRamos(params?: GetRamoParams): Promise<AxiosResponse<Ramo[]>> {
        const api = await API.obterInstanciaAxios();

        return api.get<Ramo[]>("/ramo", { params: { ...params?.filtros, ...params?.ordenado } });
    },

    async getRamosPaginado(params?: GetRamoPaginadoParams): Promise<AxiosResponse<ResponsePagina<Ramo>>> {
        const api = await API.obterInstanciaAxios();
        
        return api.get<ResponsePagina<Ramo>>("/ramo", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
    },

    async getRamo(id: number): Promise<AxiosResponse<Ramo>> {
        const api = await API.obterInstanciaAxios();

        return api.get<Ramo>(`/ramo/${id}`);
    },

    async criarRamo(ramo: Ramo): Promise<AxiosResponse<Ramo>> {
        const api = await API.obterInstanciaAxios();

        return api.post<Ramo>("/ramo", ramo);
    },
}

export default ramoServices;