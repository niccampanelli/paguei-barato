import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Categoria from "../interfaces/models/Categoria";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";

interface GetCategoriaParams {
    filtros?: Categoria,
    ordenado?: ParametrosOrdem<Categoria>
}

interface GetCategoriaPaginadoParams {
    filtros?: Categoria,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Categoria>
}

// type Retorno<T extends GetSugestaoParams | GetSugestaoPaginadoParams> =
//     T extends GetSugestaoParams ?
//     Promise<AxiosResponse<Sugestao[]>>
//     :
//     Promise<AxiosResponse<ResponsePagina<Sugestao>>>;

const categoriaServices = {
    async getCategorias(params?: GetCategoriaParams): Promise<AxiosResponse<Categoria[]>> {
        const api = await API.obterInstanciaAxios();

        return api.get<Categoria[]>("/categoria", { params: { ...params?.filtros, ...params?.ordenado } });
    },

    async getCategoriasPaginado(params?: GetCategoriaPaginadoParams): Promise<AxiosResponse<ResponsePagina<Categoria>>> {
        const api = await API.obterInstanciaAxios();
        
        return api.get<ResponsePagina<Categoria>>("/categoria", { params: { ...params?.filtros, ...params?.paginado, ...params?.ordenado } });
    },

    async getCategoria(id: number): Promise<AxiosResponse<Categoria>> {
        const api = await API.obterInstanciaAxios();

        return api.get<Categoria>(`/categoria/${id}`);
    },

    async criarCategoria(categoria: Categoria): Promise<AxiosResponse<Categoria>> {
        const api = await API.obterInstanciaAxios();

        return api.post<Categoria>("/categoria", categoria);
    },
}

export default categoriaServices;