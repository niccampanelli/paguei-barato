import { AxiosResponse } from "axios";
import ParametrosOrdem from "../interfaces/ParametrosOrdem";
import ParametrosPagina from "../interfaces/ParametrosPagina";
import Mercado from "../interfaces/models/Mercado";
import ResponsePagina from "../interfaces/ResponsePagina";
import API from "./api";
import ramoServices from "./ramoServices";
import Sugestao from "../interfaces/models/Sugestao";
import Produto from "../interfaces/models/Produto";
import produtoServices from "./produtoServices";
// import sugestaoServices from "./sugestaoServices";

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

    // async getSugestoes(id: number, idProduto: number) {
    //     const api = await API.obterInstanciaAxios();

    //     const data = await api.get<Sugestao[]>(`/mercado/${id}/produto/${idProduto}/sugestao`);
    //     const sugestoes = data.data || [];

    //     for(let i = 0; i < sugestoes.length; i++) {
    //         sugestoes[i] = await sugestaoServices.buscarRelacoesSugestao(sugestoes[i]);
    //     };

    //     return data;
    // },

    async listarProdutos(id: number): Promise<AxiosResponse<Produto[]>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.get<Produto[]>(`/mercado/${id}/produto`);
        const produtos = data.data || [];
        
        for(let i = 0; i < produtos.length; i++) {
            produtos[i] = await produtoServices.buscarRelacoesProduto(produtos[i]);
        };

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
    },

    async criarMercado(mercado: Mercado): Promise<AxiosResponse<Mercado>> {
        const api = await API.obterInstanciaAxios();

        const data = await api.post<Mercado>("/mercado", {
            nome: mercado.nome,
            logradouro: mercado.logradouro,
            numero: mercado.numero,
            complemento: mercado.complemento,
            bairro: mercado.bairro,
            cidade: mercado.cidade,
            cep: mercado.cep,
            uf: mercado.uf,
            ramoId: mercado.ramo?.id || mercado.ramoId,
            criadoPor: 1,
        });

        return data;
    },
}

export default mercadoServices;