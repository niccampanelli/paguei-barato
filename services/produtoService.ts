import { ProdutoDetalhesResponse } from "@/types/services";
import api from "./apis/api";

async function obterPorId(id: number): Promise<ProdutoDetalhesResponse> {
    try {
        const resposta = await api.get<ProdutoDetalhesResponse>(`/api/produto/${id}`);
        return resposta.data;
    } catch (error) {
        console.error("Erro ao obter produto por ID: ", error);
        throw error;
    }
}

export default {
    obterPorId,
};
