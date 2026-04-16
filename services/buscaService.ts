import { BuscaResponse } from "@/types/services/busca/BuscaResponse";

async function buscar(termos: string): Promise<BuscaResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        itens: [
            {
                id: 1,
                nome: "Produto 1",
                marca: "Marca A",
            },
            {
                id: 2,
                nome: "Loja 1",
                categoria: "Categoria X",
            },
            {
                id: 3,
                nome: "Produto 2",
                marca: "Marca B",
            },
            {
                id: 4,
                nome: "Loja 2",
                categoria: "Categoria Y",
            }
        ],
        total: 25,
    };
}

export default {
    buscar,
};