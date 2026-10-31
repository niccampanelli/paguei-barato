import { BuscaParametros } from "@/types/services/busca/BuscaRequest";
import { BuscaResponse } from "@/types/services/busca/BuscaResponse";
import api from "./apis/api";

async function buscar(parametros: BuscaParametros): Promise<BuscaResponse> {
    try {
        const resposta = await api.get<BuscaResponse>("/api/Busca", {
            params: parametros,
        });
        return resposta.data;
    }
    catch (error) {
        console.error("Erro ao buscar produtos:", JSON.stringify(error));
        throw error;
    }
}

export default {
    buscar,
};
