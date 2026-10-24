import { LojaDetalhesResponse } from "@/types/services";
import api from "./apis/api";

async function obterPorId(id: number): Promise<LojaDetalhesResponse> {
    const resposta = await api.get<LojaDetalhesResponse>(`/api/Loja/${id}`);
    return resposta.data;
}

export default {
    obterPorId,
};
