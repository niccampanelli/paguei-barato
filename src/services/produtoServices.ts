import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Produto from "../interfaces/Produto";
import ResponsePagina from "../interfaces/ResponsePagina";
import api from "./api";

interface GetProdutosParams {
    filtros?: Produto,
    paginado?: undefined,
    ordenado?: ParametrosOrdem<Produto>
}

interface GetProdutosPaginadoParams {
    filtros?: Produto,
    paginado?: ParametrosPagina,
    ordenado?: ParametrosOrdem<Produto>
}

type Retorno<T extends GetProdutosParams | GetProdutosPaginadoParams> =
    T extends GetProdutosParams ?
    Promise<AxiosResponse<Produto[]>>
    :
    Promise<AxiosResponse<ResponsePagina<Produto>>>;

const produtoServices = {
    getProdutos<T extends GetProdutosParams | GetProdutosPaginadoParams>({ ...params }: T): Retorno<T> {
        if (params.paginado)
            return api.get<ResponsePagina<Produto>>("/produto", { params: { ...params.filtros, ...params.paginado, ...params.ordenado } }) as any;
        else
            return api.get<Produto[]>("/produto", { params: { ...params.filtros, ...params.ordenado } }) as any;
    }
}

export default produtoServices;