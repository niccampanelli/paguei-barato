export interface BuscaProdutoResponse {
    id: number;
    nome: string;
    marca: string;
}

export interface BuscaLojaResponse {
    id: number;
    nome: string;
    categoria: string;
}

export type BuscaItemResponse = BuscaProdutoResponse | BuscaLojaResponse;

export interface BuscaResponse {
    itens: BuscaItemResponse[];
    total: number;
}