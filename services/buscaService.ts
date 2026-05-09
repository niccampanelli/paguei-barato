import { BuscaFiltrosSelecionados } from "@/types/app/protegidas/abas/busca";
import { BuscaItemResponse, BuscaResponse } from "@/types/services/busca/BuscaResponse";

async function buscar(termos: string, filtrosSelecionados?: BuscaFiltrosSelecionados): Promise<BuscaResponse> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const itens: BuscaItemResponse[] = [
        {
            id: 1,
            nome: "Molho de Tomate Sabor Tradicional Embalagem Sachê 300g",
            marca: "Predilecta",
            imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAeMjQdfqzZazkxvAy24ax3xBrqTeMC45tQ&s"
        },
        {
            id: 2,
            nome: "Mini Extra Artur Alvim",
            categoria: "Minimercado",
            imagemUrl: "https://static.ifood-static.com.br/image/upload/t_low/logosgde/1357da3a-258a-4132-9243-d6226fd1021c/202510021307_25AA.png"
        },
        {
            id: 3,
            nome: "Sabão em Pó 800g",
            marca: "Brilhante",
            imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XfaipTqKs0fHdU4L4X2WtL1Aud_77MTOJQ&s"
        },
        {
            id: 4,
            nome: "Abacate 1kg",
            marca: "Oba",
            imagemUrl: "https://images.tcdn.com.br/img/img_prod/450860/muda_de_abacate_avocado_fuerte_enxertada_1394_1_20190611093630.jpg"
        },
    ];

    let itensFiltrados = itens.filter((item) =>
        item.nome.toLowerCase().includes(termos.toLowerCase())
    );

    if (filtrosSelecionados && Object.keys(filtrosSelecionados).length > 0) {
        itensFiltrados = itensFiltrados.filter((item) => {
            return Object.entries(filtrosSelecionados).every(([tipo, valores]) => {
                if (valores.length === 0) return true;

                if (tipo === "Marca" && "marca" in item) {
                    return valores.includes(item.marca);
                }
                if (tipo === "Categoria" && "categoria" in item) {
                    return valores.includes(item.categoria);
                }
                return true;
            });
        });
    }

    return {
        itens: itensFiltrados,
        filtros: [
            {
                tipo: "Categoria",
                opcoes: [
                    "Minimercado",
                    "Hortifruti",
                    "Limpeza",
                ]
            },
            {
                tipo: "Marca",
                opcoes: [
                    "Predilecta",
                    "Brilhante",
                    "Oba",
                ]
            }
        ],
        total: itensFiltrados.length,
    };
}

export default {
    buscar,
};