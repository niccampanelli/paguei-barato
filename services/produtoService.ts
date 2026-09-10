import { ProdutoDetalhesResponse } from "@/types/services";
import api from "./apis/api";

async function obterPorId(id: number): Promise<ProdutoDetalhesResponse> {
    return await api.get(`/produtos/${id}`).then((response) => response.data);
}

export default {
    obterPorId,
};
