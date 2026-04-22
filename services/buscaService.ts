import { BuscaResponse } from "@/types/services/busca/BuscaResponse";

async function buscar(termos: string): Promise<BuscaResponse> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const itens = [
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

    const itensFiltrados = itens.filter((item) =>
        item.nome.toLowerCase().includes(termos.toLowerCase())
    );

    return {
        itens: itensFiltrados,
        total: itensFiltrados.length,
    };
}

export default {
    buscar,
};