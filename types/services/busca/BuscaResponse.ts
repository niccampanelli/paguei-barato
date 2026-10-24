export interface BuscaProdutoResponse {
    tipo: "produto";
    marca: string;
}

export interface BuscaLojaResponse {
    tipo: "loja";
    categoria: string;
}

export interface BuscaComumResponse {
    id: number;
    nome: string;
    imagemUrl: string;
}

export type BuscaItemResponse = (BuscaProdutoResponse | BuscaLojaResponse) & BuscaComumResponse;

export interface BuscaFiltroResponse {
    tipo: string;
    opcoes: string[];
}

export interface BuscaResponse {
    itens: BuscaItemResponse[];
    total: number;
    filtros: BuscaFiltroResponse[];
}