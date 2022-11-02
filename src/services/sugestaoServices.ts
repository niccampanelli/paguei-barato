import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Sugestao from "../interfaces/Sugestao";
import ResponsePagina from "../interfaces/ResponsePagina";
import api from "./api";

interface GetSugestaoParams {
    filtros?: Sugestao,
    paginado?: undefined,
    ordenado?: ParametrosOrdem<Sugestao>
}

interface GetSugestaoPaginadoParams {
    filtros?: Sugestao,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Sugestao>
}

type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
    T extends GetSugestaoParams ?
    Promise<AxiosResponse<Sugestao[]>>
    :
    Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const sugestaoServices = {
    getSugestoes<T extends GetSugestaoParams | GetSugestaoPaginadoParams>({ ...params }: T): Retorno<T> {
        if (params.paginado)
            return api.get<ResponsePagina<Sugestao>>("/sugestao", { params: { ...params.filtros, ...params.paginado, ...params.ordenado } }) as any;
        else
            return api.get<Sugestao[]>("/sugestao", { params: { ...params.filtros, ...params.ordenado } }) as any;
    }
}

export default sugestaoServices;